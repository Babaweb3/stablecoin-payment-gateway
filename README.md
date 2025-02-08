# stablecoin-payment-gateway

# Stablecoin Payment Gateway

This repository contains the **Stablecoin Payment Gateway**, a multi-chain payment processing solution designed for global transactions using stablecoins. It includes both an **API** and an **SDK** to facilitate seamless integration into e-commerce platforms.

## Features
- Supports multiple stablecoins across EVM and non-EVM blockchains
- Provides an API for handling transactions
- Offers an SDK for easy integration
- Secure and scalable architecture
- Designed for global e-commerce applications

## Deployment

### 1. Clone the Repository
```sh
git clone https://github.com/Babaweb3/stablecoin-payment-gateway.git
cd stablecoin-payment-gateway
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file and add the following variables:
```
EVM_RPC_URL=https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID
STELLAR_NETWORK=public
API_KEY=your_api_key
```

### 4. Start the API Server
```sh
npm start
```
The API will be available at `stablecoin-payments-gateway-production.up.railway.app`

## SDK Integration

### Install the SDK
```sh
npm install stablecoin-gateway-sdk
```

### Usage
```javascript
const { StablecoinGateway } = require('stablecoin-gateway-sdk');

const gateway = new StablecoinGateway({ apiKey: 'your_api_key' });

gateway.processPayment({
  amount: 100,
  currency: 'USDC',
  network: 'Ethereum',
  recipient: '0xRecipientAddress'
}).then(response => console.log(response));
```

## Hosting
You can deploy the API using **Railway**, **Heroku**, or **AWS**.

### Deploy with Railway
```sh
railway up
```

### Deploy to GitHub
```sh
git add .
git commit -m "Initial commit"
git push origin main
```

## Contributing
Feel free to fork this repository and submit pull requests.

## License
MIT License
