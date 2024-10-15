const request = require('supertest');
const app = require('../app');

describe('Product API Tests', () => {

describe('GET /products', () => {
 it('should return all products', async () => {
const products = [
  { id: 1, name: 'Laptop', price: 1000, stock: 5 },
  { id: 2, name: 'Smartphone', price: 600, stock: 10 }
];
const res = await request(app).get('/products');
expect(res.statusCode).toBe(200);
expect(res.body).toEqual(products);
 });
});

describe('GET /products/:id', () => {
it('should return a product by ID', async () => {
const res = await request(app).get('/products/1');
expect(res.statusCode).toBe(200);
expect(res.body).toEqual({ id: 1, name: 'Laptop', price: 1000, stock: 5 });
});

it('should return 404 if product not found', async () => {
const res = await request(app).get('/products/3');
expect(res.statusCode).toBe(404);
expect(res.body).toEqual({message : 'Product not found'});
});
});

describe('POST /products', () => {
it('should add a new product', async () => {
const res = await request(app).post('/products').send({name: 'CPU', price: 1500, stock: 10});
expect(res.statusCode).toBe(201);
expect(res.body).toEqual({id: 3, name: 'CPU', price: 1500, stock: 10});
 });
});

describe('PUT /products/:id', () => {
it('should update an existing product', async () => {
const res = await request(app).put('/products/3').send({name: 'Mainboard', stock: 3});
expect(res.statusCode).toBe(200);
expect(res.body).toEqual({id: 3, name: 'Mainboard', price: 1500, stock: 3});
});
it('should return 404 if product not found', async () => {
const res = await request(app).put('/products/4').send({name: 'GPU', price: 12000, stock: 1});;
expect(res.statusCode).toBe(404);
expect(res.body).toEqual({message : 'Product not found'});
 });
});

describe('DELETE /products/:id', () => {
it('should delete a product', async () => {
const res = await request(app).delete('/products/3');
expect(res.statusCode).toBe(200);
expect(res.body).toEqual({message : 'Product deleted'});
});
it('should return 404 if product not found', async () => {
const res = await request(app).delete('/products/4');
expect(res.statusCode).toBe(404);
expect(res.body).toEqual({message : 'Product not found'});
 });
});

});
