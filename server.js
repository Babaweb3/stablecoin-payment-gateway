require("dotenv").config();
const express = require("express");
const { ethers } = require("ethers");
const StellarSdk = require("stellar-sdk");

const app = express();
app.use(express.json());

// Define supported chains and their RPCs
const networks = {
    ethereum: process.env.INFURA_ETH_RPC_URL,
    polygon: process.env.INFURA_POLYGON_RPC_URL,
    arbitrum: process.env.INFURA_ARBITRUM_RPC_URL,
    bsc: process.env.BSC_RPC_URL,
    avalanche: process.env.AVALANCHE_RPC_URL,
    optimism: process.env.OPTIMISM_RPC_URL,
    stellar: process.env.STELLAR_RPC_URL,
};

// Function to get EVM provider
const getProvider = (network) => new ethers.JsonRpcProvider(networks[network]);

// Function to send payments via Stellar
const sendStellarPayment = async (recipient, amount, asset) => {
    const server = new StellarSdk.Server(networks.stellar);
    const sourceKeypair = StellarSdk.Keypair.fromSecret(process.env.STELLAR_SECRET_KEY);
    const sourceAccount = await server.loadAccount(sourceKeypair.publicKey());

    // Define asset (USDC, USDT, XLM, etc.)
    const paymentAsset = asset === "XLM" ? StellarSdk.Asset.native() : new StellarSdk.Asset(asset, recipient);

    // Build transaction
    const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
        fee: StellarSdk.BASE_FEE,
        networkPassphrase: StellarSdk.Networks.PUBLIC,
    })
        .addOperation(
            StellarSdk.Operation.payment({
                destination: recipient,
                asset: paymentAsset,
                amount: amount.toString(),
            })
        )
        .setTimeout(30)
        .build();

    // Sign transaction
    transaction.sign(sourceKeypair);

    // Submit transaction
    return server.submitTransaction(transaction);
};

// Payment API Endpoint
app.post("/pay", async (req, res) => {
    try {
        const { chain, recipient, amount, stablecoinAddress } = req.body;

        if (!networks[chain]) {
            return res.status(400).json({ error: "Unsupported blockchain" });
        }

        if (chain === "stellar") {
            const result = await sendStellarPayment(recipient, amount, stablecoinAddress);
            return res.json({ success: true, transactionHash: result.hash, chain });
        }

        // EVM Transaction Handling
        const provider = getProvider(chain);
        const wallet = new ethers.Wallet("your_private_key_here", provider);

        const stablecoinContract = new ethers.Contract(
            stablecoinAddress,
            ["function transfer(address to, uint256 amount) public returns (bool)"],
            wallet
        );

        const tx = await stablecoinContract.transfer(recipient, ethers.parseUnits(amount, 18));
        await tx.wait();

        res.json({ success: true, transactionHash: tx.hash, chain });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(3000, () => console.log("Multi-Chain Payment Gateway Running on Port 3000"));
