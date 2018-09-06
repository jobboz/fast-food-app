import app from '../app'  //hnb inserted a single .
import request from "supertest";
import { expect } from "chai";



describe('GET all orders', () => {
  it('return all orders', (done) => {
    request(app)
      .get('/api/v1/foods')  //inserted post instead of get
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body.status).to.equal('success');
        expect(res.body.message).to.equal('successfully retrived all school');//.equal.to
        done();
      });
  });
  it('GET specific orders', (done) => {
    request(app)
      .get('/api/v1/foods/10')  //NOT WORKING
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('create new orders', (done) => {
    request(app)
      .post('/api/v1/foods')
      .send({
        name: 'gdggdgdg',
        amount: 2300,
        quantity: 5,
        deliveryAddress: ' nnn shhhs hshs'
      })
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('created');  //sees the first specification in our route
        done();
      });
  });
  it('create post input validator', (done) => {
    request(app)
      .post('/api/v1/foods')
      .set('Accept', 'application/json')
      .send({})
      .expect(400)
      .end((err, res) => {
         expect(res.body).to.be.an('object');
        //  expect('bad request').to.equal(res.body.status);
        //  expect('all or some field are undefined').to.equal(res.body.message);
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
  it('update specific orders', (done) => {
    request(app)
      .put('/api/v1/foods/1')  //
      .set('Accept', 'application/json')
      .send({
        name: 'jeans',
        amount: 7000,
        quantity: 1,
        deliveryAddress: '60 heavens gate long way road'

      })
      .expect(200)
      .end((err, res) => {
        expect('success').to.equal(res.body.status);
        expect('successfully updated an order').to.equal(res.body.message);
        if (err) done(err);
        done();
      });
  });
  it('should return status code of 404 when making a  put request', (done) => {
    request(app)
      .put('/api/v1/foods/18')
      .set('Content-Type', 'application/json')
      .send({
        name: 'jeans',
        amount: 7000,
        quantity: 1,
        deliveryAddress: '60 heavens gate long way road'
      })
      .expect(400)
      .end((err, res) => {
        expect('bad request').to.equal(res.body.status);
        expect('food with id 18 does not exit').to.equal(res.body.message);
        expect(res.status).to.equal(404);
        done();
      });
  });
});