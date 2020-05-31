jest.mock("./ingredientsService");
import request from "supertest"
import app from "./app"
import {listIngredients, addIngredient, deleteIngredient} from "./ingredientsService"

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
    const ingredient = {name: 'sweet potato', quantity: 150, unit: 'g'};
    (addIngredient as jest.Mock).mockResolvedValueOnce({id:"someId", ...ingredient})
    request(app)
      .post('/add-ingredient')
      .send(ingredient)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({id: "someId", name: 'sweet potato', quantity: 150, unit: 'g'})
      .end(function(err, res) {
        if (err) return done(err)
        expect(addIngredient).toHaveBeenCalledWith(ingredient);
        done()
      })
  })
})

describe('DELETE /delete-ingredient', () => {
  it('removes ingredient from database', (done) => {
    request(app)
      .delete('/delete-ingredient')
      .send({id: 'someId'})
      .set('Accept', 'application/json')
      // .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err)
        expect(deleteIngredient).toHaveBeenCalledWith('someId');
        done()
      })
  })
})
