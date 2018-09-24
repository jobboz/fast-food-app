import app from '../app'
import request from "supertest";
import { expect } from "chai";



describe('Test for all routes for fast food app', () => {
   
  it('return all orders', (done) => {
    request(app)
      .get('/api/v1/foods')  
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('successfully retrived all orders');//.equal.to
        done();
      });
  });
  it('GET specific orders', (done) => {
    request(app)
      .get('/api/v1/foods/1')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success')
        expect(res.body.message).to.equal('successfully retrived')
        done();
      });
  });
  it('should return error message for create orders if no values is inputed', (done) => {
    request(app)
      .post('/api/v1/foods')
      .send({ })
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect('failed').to.equal(res.body.status);
         expect('all or some field are undefined').to.equal(res.body.message);
        done();
      });
  });
  
  it('should successfully create an order', (done) => {
    request(app)
      .post('/api/v1/foods')
      .send({
        name:'gsgsggsgsgs',
        amount: 7000,
        quantity: 1,
        deliveryAddress: '60 heavens gate long way road'
      })
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect('created').to.equal(res.body.status);
         expect('successfully created').to.equal(res.body.message);
        done();
      });
  });
 
  it('should successfully update an order', (done) => {
    request(app)
      .put('/api/v1/foods/2')
      .send({
        name:'hamg dgdgd',
        amount: 6600,
        quantity: 3,
        deliveryAddress: 'bhdhdhh ns gate long way road'
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect('success').to.equal(res.body.status);
         expect('successfully updated an order').to.equal(res.body.message);
        done();
      });
  });
 
  it('should return status code of 404 for an invalid data', (done) => {
    request(app)
      .put('/api/v1/foods/14')  
      .send({
        name: 'jeans',
        amount: 7000,
        quantity: 1,
        deliveryAddress: '60 heavens gate long way road'
      })
        .expect(404)
        .end((err, res) => {
          expect('bad request').to.equal(res.body.status);
          expect('food with id 14 does not exit').to.equal(res.body.message);
          expect(res.status).to.equal(404);
          done();
      });
  });
  
  it('delete specific orders', (done) => {
    request(app)
      .del('/api/v1/foods/3')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect('success').to.equal(res.body.status);
        expect('successfully deleted').to.equal(res.body.message);
        if (err) done(err);
        done();
      });
  });
  it('should return status code of 400 when food id dose not exist', (done) => {
    request(app)
      .del('/api/v1/foods/10')
      .set('Content-Type', 'application/json')
      .expect(400)
      .end((err, res) => {
        expect('not found').to.equal(res.body.status);
        expect('the food with the given id 10 was not found').to.equal(res.body.message);
        expect(res.status).to.equal(400);
        done();
      });
  });
  
});