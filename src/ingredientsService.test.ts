import {listIngredients, addIngredient, deleteIngredient} from "./ingredientsService"
import { Client } from 'pg'

describe('list ingredients', () => {
  const values = ["name", 1, "unit", new Date(), new Date()]
  let client:Client;

  beforeEach(async ()=>{
    client = new Client({
      user: 'carlyjenkinson',
      database: 'mymealapp_test'
    }) 
    await client.connect()
    return await client.query('DELETE FROM current_stock')
  });

  it('returns list of ingredients from the database', async () => {
    await client.query('INSERT INTO current_stock(ingredient_name, quantity, unit, created_at, updated_at) VALUES($1, $2, $3, $4, $5) RETURNING *', values)
    const ingredients = await listIngredients()  
    expect(ingredients.length).toEqual(1);
    expect(ingredients).toEqual([{name: "name", quantity: 1, unit: "unit"}])
  })

  it('adds an ingredient to the database', async () => {
    const ingredient = {name: 'pineapple', quantity: 300, unit: 'g'}
    await addIngredient(ingredient)
    const ingredients = await client.query('SELECT * FROM current_stock')
    expect(ingredients.rows).toEqual([expect.objectContaining({ingredient_name: "pineapple", quantity: 300, unit: "g"})])
  })

  it('deletes an ingredient from the database', async () => {
    const ingredient = {name: 'pineapple', quantity: 300, unit: 'g'}
    await addIngredient(ingredient)
    await deleteIngredient(ingredient)
    const ingredients = await client.query('SELECT * FROM current_stock')
    expect(ingredients.rows).toEqual([])
  })

  afterEach(async () => {
    await client.query('DELETE FROM current_stock')
    await client.end();
  })
}) 