import app from '../app'
import request from "supertest";
import { expect } from "chai";




describe('Test for all routes for fast food apps', () => {
   
  it('return all orders', (done) => {
    request(app)
      .get('/api/v1/foods')  
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
      .get('/api/v1/foods/1')
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
      .get('/api/v1/foods/50')
      .send({ })
      .expect(404)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect('failed').to.equal(res.body.status);
         expect('The User with the given id was not found').to.equal(res.body.message);
        done();
      });
  });
  it('should successfully create an order', (done) => {
    request(app)
      .post('/api/v1/foods')
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
    request(app)
      .put('/api/v1/foods/2')
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
      .put('/api/v1/foods/40')  
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
          done();
      });
  });
   
  it('delete specific orders', (done) => {
    request(app)
      .del('/api/v1/foods/77')
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        expect('success').to.equal(res.body.status);
        expect('successfully deleted user').to.equal(res.body.message);
        if (err) done(err);
        done();
      });
  });
  it('should return `400` status code when any field are undefined', (done) => {
    request(app)
      .post('/api/v1/foods')
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
      .put('/api/v1/foods/96')
      .send({})
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
         expect('All or some field is/are undefined').to.equal(res.body.message);
        done();
      });
  });

  
});