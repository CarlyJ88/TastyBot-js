import request from "supertest"
import app from "./app"

describe('POST /users', function() {
  it('responds with json', function(done) {
    request(app)
      .post('/add')
      .send({name: 'beetroot', quantity: '50', unit: 'g'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({name: 'beetroot', quantity: '50', unit: 'g'})
      .end(function(err, res) {
        if (err) return done(err)
        done()
      })
  })
})