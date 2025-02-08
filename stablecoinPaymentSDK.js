/**
 * stablecoinPaymentSDK.js
 * SDK for interacting with the Stablecoin Payment Gateway API.
 */
(class StablecoinPaymentSDK {
    constructor(apiUrl, merchantKey) {
        this.apiUrl = apiUrl;
        this.merchantKey = merchantKey;
    }

    async makePayment(chain, recipient, amount, stablecoinAddress) {
        const response = await fetch(`${this.apiUrl}/pay`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.merchantKey}`,
            },
            body: JSON.stringify({ chain, recipient, amount, stablecoinAddress }),
        });

        return await response.json();
    }
}

module.exports = StablecoinPaymentSDK;