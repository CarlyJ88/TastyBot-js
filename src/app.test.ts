jest.mock("./ingredientsService");
import request from "supertest"
import app from "./app"
import {listIngredients} from "./ingredientsService"

describe('POST /add-ingredient', () => {
  it('responds with json', (done) => {
    request(app)
      .post('/add-ingredient')
      .send({name: 'beetroot', quantity: 50, unit: 'g'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({name: 'beetroot', quantity: 50, unit: 'g'})
      .end(function(err, res) {
        if (err) return done(err)
        done()
      })
  })
})

describe('GET /list', () => {
  it('lists items', async () => {
    const listOfIngredients =[{name: 'beetroot', quantity: 50, unit: 'g'}, {name: 'sweet potato', quantity: 500, unit: 'g'}, {name: 'peppers', quantity: 100, unit: 'g'}];
    (listIngredients as jest.Mock).mockResolvedValue(listOfIngredients)
    return request(app)
    .get('/list')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(await listOfIngredients)
  })
})

describe('POST /add-ingredient', () => {
  it('responds with json', (done) => {
    request(app)
      .post('/add-ingredient')
      .send({name: 'sweet potato', quantity: 150, unit: 'g'})
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({name: 'sweet potato', quantity: 150, unit: 'g'})
      .end(function(err, res) {
        if (err) return done(err)
        done()
      })
  })
})
