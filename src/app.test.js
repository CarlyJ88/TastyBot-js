import request from "supertest"
import app from "./app"

describe('POST /add', () => {
  it('responds with json', (done) => {
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

describe('GET /list', () => {
  it('lists items', () => {
    return request(app)
    .get('/list')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect([{name: 'beetroot', quantity: '50', unit: 'g'}, {name: 'sweet potato', quantity: '500', unit: 'g'}, {name: 'peppers', quantity: '100', unit: 'g'}])
  })
})