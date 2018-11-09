import app from '../app'
import request from "supertest";
import { expect } from "chai";
import { access } from 'fs';

const authToken =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJlbm4iLCJpYXQiOjE1NDE3MTA3NTAsImV4cCI6MTU0MTc0Njc1MH0.MSGbZ2_IrnFItTFesmexn15c7hrwNCUdS2fSXcZMahs';
const wrongToken = 'dshjjjjjjjjjnnbbbvvvvvvk';
 

describe('Test for all routes for fast food apps', () => {
  describe('Test cases for loading application home page', () => {
  it('should load application home page', (done) => {
    request(app)
      .get('/')  
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.message).to.equal('welcome to fast food app');
        if (err) done(err);
        done();
       }) 
     });
  });
   
  it('return all orders', (done) => {
    request(app)
      .get(`/api/v1/foods?token=${authToken}`)  
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('Success');
        expect(res.body).to.have.property('message');
        done();
      });
  });
 
  it('GET specific user', (done) => {
    request(app)
      .get(`/api/v1/foods/2?token=${authToken}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success')
        expect(res.body.message).to.equal('successfully retrived user')
        done();
      });
  });
  it('should return `404`for an invalid id', (done) => {
    request(app)
      .get(`/api/v1/foods/70?token=${authToken}`)
      .send({ })
      .expect(404)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect('failed').to.equal(res.body.status);
         expect('The User with the given id was not found').to.equal(res.body.message);
        done();
      });
  });
  it('should successfully create user', (done) => {
    request(app)
      .post(`/api/v1/foods?token=${authToken}`)
      .send({
        username:'gsgsggsgsgs',
        email: 7000,
        password: 77665,
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect('success').to.equal(res.body.status);
         expect('successfully added new user').to.equal(res.body.message);
        done();
      });
  });
  it('should successfully update an order', (done) => {
    r\
    equest(app)
      .put(`/api/v1/foods/3?token=${authToken}`)
      .send({
        username:'hamg dgdgd',
        email: 6600,
        password: 3
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
      .put(`/api/v1/foods/200?token=${authToken}`)  
      .send({
        username: 'paul',
        email: 7000,
        password: 8975
      })
        .expect(404)
        .end((err, res) => {
          expect('failed').to.equal(res.body.status);
          expect('user id does not exist').to.equal(res.body.message);
          expect(res.status).to.equal(404);
          done();``
      });
  });
   
  it('delete specific orders', (done) => {
    request(app)
      .del(`/api/v1/foods/6?token=${authToken}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect('successfully deleted user').to.equal(res.body.message);
        if (err) done(err);
        done();
      });
  });
  it('should return `400` status code when any field are undefined', (done) => {
    request(app)
      .post(`/api/v1/foods?token=${authToken}`)
      .send({})
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
         expect('All or some field is/are undefined').to.equal(res.body.message);
        done();
      });
  });
  
  it('should return `404` status code when any field is undefined', (done) => {
    request(app)
      .put(`/api/v1/foods/5?token=${authToken}`)
      .send({})
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
         expect('All or some field is/are undefined').to.equal(res.body.message);
        done();
      });
  });
  //test cases for orders

  it('gets all orders', (done) => {
    request(app)
      .get(`/api/v1/orders?token=${authToken}`)  
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('GET specific orders', (done) => {
    request(app)
      .get(`/api/v1/orders/7?token=${authToken}`)
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success')
        expect(res.body.message).to.equal('successfully retrived order')
        done();
      });
  });
  it('should return `404`for an invalid id', (done) => {
    request(app)
      .get(`/api/v1/orders/100?token=${authToken}`)
      .send({ })
      .expect(404)
      .end((err, res) => {   ///  ``
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('failed')
         expect(res.body.message).to.equal('The order with the given id was not found')
        done();
      });
  });
  it('should successfully create an order', (done) => {
    request(app)
    
      .post(`/api/v1/orders?token=${authToken}`)
      .send({
        name: "emmanuel",
        amount: "888",
        quantity: "9999",
        deliveryAddress: "hgvfvccfcvcvbb"
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
         expect('success').to.equal(res.body.status);
         expect('successfully added orders').to.equal(res.body.message);
        done();
      });
  });
  it('should successfully update an order', (done) => {
    request(app)
      .put(`/api/v1/orders/8?token=${authToken}`)
      .send({
        name:'hamgdgdgd',
        amount: 6600,
        quantity: 3,
        deliveryAddress:'hydgfdfgdfgdfg'
      })
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect('success').to.equal(res.body.status);
         expect('successfully updated order').to.equal(res.body.message);
        done();
      });
  });
  it('should return status code of 404 for an invalid data', (done) => {
    request(app)
      .put(`api/v1/orders/200?token=${authToken}`)  
      .send({
        name: 'paul', 
        amount: 7000,
        quantity: 8975,
        deliveryAddress:'gtreratgtgbvb'
      })
        .expect(404)
        .end((err, res) => {
          expect(res.body.status).to.equal('failed');
          expect(res.body.message).to.equal('order id does not exist');
          expect(res.status).to.equal(404);
          done();
      });
  });  
  it('should return `404` status code when any field is undefined', (done) => {
    request(app)
      .post(`/api/v1/orders?token=${authToken}`)
      .send({})
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
         expect('all or some field are undefined').to.equal(res.body.message);
        done();
      });
  });
  it('delete specific orders', (done) => {
    request(app)
      .del('/api/v1/orders/3')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect('success').to.equal(res.body.status);
        expect('successfully deleted order').to.equal(res.body.message);
        if (err) done(err);
        done();
      });
  });
  it('returns 404 for an invalid id', (done) => {
    request(app)
      .del(`/api/v1/orders/40?token=${authToken}`)
      .set('Accept', 'application/json')
      .expect(404)
      .end((err, res) => {
        expect('failed').to.equal(res.body.status);
        expect('The order with the given id was not found').to.equal(res.body.message);
        if (err) done(err);
        done();
      });
  });
});