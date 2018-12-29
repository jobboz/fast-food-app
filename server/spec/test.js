import app from '../app'
import request from "supertest";
import { expect } from "chai";
import { access } from 'fs';
import { userInfo } from 'os';

const authToken =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFhYXd3cSIsImlhdCI6MTU0NDA0MTA2MywiZXhwIjoxNTQ0MDc3MDYzfQ.AzSRTGaGdIder7E8_CBgix_GvxzEfBYlPqP-cltVOXk';
const verifyAdmin =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTQ0MDQwOTU5LCJleHAiOjE1NDQwNzY5NTl9.M2UQaUUAEtd3VRcI8kVeu2NkXEhDBoPX0ISoyPXuXVo'

 

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
  it('should fail to load application home page', (done) => {
    request(app)
      .get('/home')  
      .set('Accept', 'application/json')
      .expect(404)
      .end((err, res) => {
        expect(res.body.message).to.equal('page not found');
        expect(res.body.status).to.equal('failed');
        if (err) done(err);
        done();
       }) 
     });
     it('should fail get route', (done) => {
      request(app)
        .get('/api/v1')  
        .set('Accept', 'application/json')
        .expect(404)
        .end((err, res) => {
          expect(res.body.message).to.equal('page not found');
          expect(res.body.status).to.equal('failed');
          if (err) done(err);
          done();
         }) 
       });
       describe('All test cases for users', () => {
        describe('All test cases for user signUp', () => {
        it('should create a new user account and return a `201`', (done) => {
        
           request(app)
            .post('/api/v1/signup') 
            .send({
              username: 'aaawwq',
              email: 'fetushrrre@hhhgmail.comcdcc',
              password: '11111111'
            })
            .expect(201)
            .end((err, res) => {
              expect(res.body.status).to.equal('success');
              expect(res.body.message).to.equal('successfully created users account');
              expect(res.body.data.username).to.equal('aaawwq');
              expect(res.body.data.email).to.equal('fetushrrre@hhhgmail.comcdcc');
              if(err) done(err);
              done();
             });
           });
        });
      });

      it('should check if user already exist in the database and return `409`', (done) => {
        const userInfo = {
              username: 'aaawwq',
              email: 'fetushrrre@hhhgmail.comcdcc',
              password: '11111111'
        }
        request(app)
          .post('/api/v1/signup')  
          .send(userInfo)
          .expect(200)
          .end((err, res) => {
            expect(res.body.status).to.equal('Failed');
            expect(res.body.message).to.equal('user already exist');
            done();
          });
      });
      it('should not create a new user account and return `400`', (done) => {
        request(app)
          .post('/api/v1/signup')  
          .send({ 
            username: '',
            email: '',
            password: ''
      })
          .expect(400)
          .end((err, res) => {
             expect(res.body.errors.username).to.equal('username is required');
             expect(res.body.errors.email).to.equal('email is required');
             expect(res.body.errors.password).to.equal('password is required');
            done();
          });
      });       
      it('should not create a new user account and return `400`', (done) => {
        request(app)
          .post('/api/v1/signup')  
          .send({ 
            username: 'j',
            email: 'bbb.com',
            password: 'uuuu'
      })
          .expect(400)
          .end((err, res) => {
             expect(res.body.errors.username).to.equal('username must be between  2 to 100 characters');
             expect(res.body.errors.email).to.equal('Enter a valid email address');
             expect(res.body.errors.password).to.equal('password must be eight character or more');
            done();
          });
      });
      it('should not log in a new user account and return a status of `400`', (done) => {
        request(app)
          .post('/api/v1/signup')  
          .send({ })
          .expect(400)
          .end((err, res) => {
             expect(res.body).deep.equal({
              message: 'All or some field is/are undefined'
              });
            done();
          });
      });       
      it('should not log in a new user account and return a status of `400`', (done) => {
        request(app)
          .post('/api/v1/signin')  
          .send({
            username:'b',
            password:'gggg'
           })
          .expect(400)
          .end((err, res) => {
             expect(res.body.errors.username).to.equal('username must be between 2 to 100 characters');
              expect(res.body.errors.password).to.equal('password must be eight character or more')
            done();
          });
      });       
  it('return all orders', (done) => {
    request(app)
      .get(`/api/v1/users?token=${authToken}`)  
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
      .get(`/api/v1/users/2?token=${authToken}`)
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
      .get(`/api/v1/users/300?token=${authToken}`)
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
      .post(`/api/v1/users?token=${authToken}`)
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
      .put(`/api/v1/users/3?token=${authToken}`)
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
      .put(`/api/v1/users/200?token=${authToken}`)  
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
   
  it('delete specific users', (done) => {
    request(app)
      .del(`/api/v1/users/59?token=${authToken}`)
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
      .post(`/api/v1/users?token=${authToken}`)
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
      .put(`/api/v1/users/5?token=${authToken}`)
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
    
      .post(`/api/v1/orders?token=${verifyAdmin}`)
      .send({
        name: 'eba',
        amount: 5000,
        quantity: 4,
        deliveryAddress: '489 obafemi duro street lagos'
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
      .post(`/api/v1/orders?token=${verifyAdmin}`)
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
      .del('/api/v1/orders/61')
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
      .del(`/api/v1/orders/100?token=${authToken}`)
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