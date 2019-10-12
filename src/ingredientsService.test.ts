import {listIngredients} from "./ingredientsService"
import { Client } from 'pg'

describe('list ingredients', () => {
  const values = ["name", 1, "unit", new Date(), new Date()]
  const client = new Client({
      user: 'carlyjenkinson',
      database: 'mymealapp_test'
    }) 
    


  beforeEach(async ()=>{
    await client.connect().then(async ()=>{
    // await client.connect()
    // await client.query('DELETE FROM current_stock');
    // await client.query('INSERT INTO current_stock(ingredient_name, quantity, unit, created_at, updated_at) VALUES($1, $2, $3, $4, $5) RETURNING *', values);
    // await client.end()
        return await client.query('DELETE FROM current_stock')
        })
      });

  it('returns list of ingredients from the database', async () => {
    client.query('INSERT INTO current_stock(ingredient_name, quantity, unit, created_at, updated_at) VALUES($1, $2, $3, $4, $5) RETURNING *', values)
    const ingredients = await listIngredients()  
    expect(ingredients.length).toEqual(1);
    expect(ingredients).toEqual([{name: "name", quantity: 1, unit: "unit"}])
    
  })

  afterEach(async () => {
    await client.query('DELETE FROM current_stock')
    await client.end();
  })
}) 