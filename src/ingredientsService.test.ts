import {listIngredients, addIngredient, deleteIngredient} from "./ingredientsService"
import { Client } from 'pg'
import { cleanDb } from "./testHelper/cleanDb";

describe('list ingredients', () => {
  const values = ["name", 1, "unit"]
  let client:Client;

  beforeEach(async ()=>{
    client = new Client({
      user: 'postgres',
      password: 'password',
      database: 'tasty_bot_test'
    }) 
    await client.connect()
    await cleanDb(client);
    return await client.query('DELETE FROM current_stock')
  });

  it('returns list of ingredients from the database', async () => {
    await client.query('INSERT INTO current_stock(ingredient_name, quantity, unit) VALUES($1, $2, $3) RETURNING *', values)
    const ingredients = await listIngredients()  
    expect(ingredients.length).toEqual(1);
    expect(ingredients).toEqual([{id: expect.anything(), ingredient_name: "name", quantity: 1, unit: "unit"}])
  })

  it('adds an ingredient to the database', async () => {
    const ingredient = {ingredient_name: 'pineapple', quantity: 300, unit: 'g'}
    await addIngredient(ingredient)
    const ingredients = await client.query('SELECT * FROM current_stock')
    expect(ingredients.rows).toEqual([expect.objectContaining({ingredient_name: "pineapple", quantity: 300, unit: "g"})])
  })

  it('deletes an ingredient from the database', async () => {
    const ingredient = {ingredient_name: 'pineapple', quantity: 300, unit: 'g'}
    const ingredientSaved = await addIngredient(ingredient)
    console.log(ingredientSaved.id, 'ingredientSaved.id')
    await deleteIngredient(ingredientSaved.id)
    console.log(ingredientSaved.id, 'ingredientSaved.id')
    const ingredients = await client.query('SELECT * FROM current_stock')
    expect(ingredients.rows).toEqual([])
  })

  it('deletes the correct ingredient from the database', async () => {
    const ingredient1 = {ingredient_name: 'pineapple', quantity: 300, unit: 'g'}
    const ingredient2 = {ingredient_name: 'apple', quantity: 200, unit: 'g'}
    const ingredientSaved1 = await addIngredient(ingredient1)
    const ingredientSaved2 = await addIngredient(ingredient2)
    await deleteIngredient(ingredientSaved2.id)
    const ingredients = await client.query('SELECT * FROM current_stock')
    expect(ingredients.rows).toEqual([expect.objectContaining(ingredientSaved1)])
  })

  afterEach(async () => {
    await client.query('DELETE FROM current_stock')
    await cleanDb(client);
    return await client.end();
  })
})
