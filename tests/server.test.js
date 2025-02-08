const request = require('supertest');
const app = require('../server');

describe('Stablecoin Payment Gateway API', () => {
  it('should create a payment order', async () => {
    const response = await request(app)
      .post('/create-payment')
      .send({ amount: "100.00", coin: "USDC" });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('orderId');
    expect(response.body.paymentAddress).toBeDefined();
  });
});