import {listRecipeIngredients, addRecipeIngredient, deleteRecipeIngredient} from "./recipeIngredientsService"
import { Client } from 'pg'
import { cleanDb } from "./testHelper/cleanDb";

describe('list ingredients', () => {
  const values = ["name", 1, "unit", 1]
  const authorId = 1
  const userValues = [authorId, "carly", "jenkinson", "cj@gmail.com", "*****"]
  const cuisineValues = [1, "Thai"]
  const recipeId = 1
  const recipeValues = [recipeId, authorId, "pancakes", "url", "Yummy", "Heat 1tbsp of oil in a pan...", 1]
  let client:Client;

  beforeEach(async ()=>{
    client = new Client({
      user: 'postgres',
      password: 'password',
      database: 'tasty_bot_test'
    }) 
    await client.connect()
    await cleanDb(client);

    await client.query('INSERT INTO users(id, first_name, surname, email, password_digest) VALUES($1, $2, $3, $4, $5) RETURNING *', userValues)
    await client.query('INSERT INTO cuisine(id, cuisine_name) VALUES($1, $2) RETURNING *', cuisineValues)
    return await client.query('INSERT INTO recipe(id, author_id, recipe_name, picture, recipe_description, method, cuisine_id ) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *', recipeValues)
  });

  it('returns list of ingredients from the database', async () => {
    await client.query('INSERT INTO recipe_ingredients(ingredient_name, quantity, unit, recipe_id) VALUES($1, $2, $3, $4) RETURNING *', values)
    const ingredients = await listRecipeIngredients()  
    expect(ingredients.length).toEqual(1);
    expect(ingredients).toEqual([{id: expect.anything(), ingredientName: "name", quantity: 1, unit: "unit", recipeId: recipeValues[authorId]}])
  })

  it('adds an ingredient to the database', async () => {
    const ingredient = {ingredientName: 'pineapple', quantity: 300, unit: 'g', recipeId: 1}
    await addRecipeIngredient(ingredient)
    const ingredients = await client.query('SELECT * FROM recipe_ingredients')
    expect(ingredients.rows).toEqual([expect.objectContaining({ingredient_name: "pineapple", quantity: 300, unit: "g", recipe_id: 1})])
  })

  it('deletes an ingredient from the database', async () => {
    const ingredient = {ingredientName: 'pineapple', quantity: 300, unit: 'g', recipeId: 1}
    const ingredientSaved = await addRecipeIngredient(ingredient)
    await deleteRecipeIngredient(ingredientSaved.id)
    const ingredients = await client.query('SELECT * FROM recipe_ingredients')
    expect(ingredients.rows).toEqual([])
  })

  it('deletes the correct ingredient from the database', async () => {
    const ingredient1 = {ingredientName: 'pineapple', quantity: 300, unit: 'g', recipeId: 1}
    const ingredient2 = {ingredientName: 'apple', quantity: 200, unit: 'g', recipeId: 1}
    const ingredientSaved1 = await addRecipeIngredient(ingredient1)
    const ingredientSaved2 = await addRecipeIngredient(ingredient2)
    await deleteRecipeIngredient(ingredientSaved2.id)
    const ingredients = await client.query('SELECT * FROM recipe_ingredients')
    expect(ingredients.rows).toEqual([expect.objectContaining({ingredient_name: "pineapple", quantity: 300, unit: "g", recipe_id: 1})])
  })

  afterEach(async () => {
    await cleanDb(client);
    return await client.end();
  })
}) 