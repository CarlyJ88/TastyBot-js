import {listRecipe, addRecipe, deleteRecipe} from "./recipeService"
import { Client } from 'pg'
import { cleanDb } from "./testHelper/cleanDb";

describe('list ingredients', () => {
  const cuisineValues = [1, "Thai"]
  const authorId = 1
  const userValues = [authorId, "carly", "jenkinson", "cj@gmail.com", "*****"]
  const recipeValues = [authorId, "Thai Green curry with rice", "url", "yummy!", "Boil the water in a pan...", 1]
  const recipe = {authorId: 1, recipeName: "Thai Green curry with rice", picture: "url", recipeDescription: "yummy!", method: "Boil the water in a pan...", cuisineId: 1}
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
    return await client.query('INSERT INTO cuisine(id, cuisine_name) VALUES($1, $2) RETURNING *', cuisineValues)
  });

  it('returns list of recipes from the database', async () => {
    await client.query('INSERT INTO recipe(author_id, recipe_name, picture, recipe_description, method, cuisine_id ) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', recipeValues)
    const recipes = await listRecipe()  
    expect(recipes.length).toEqual(1);
    expect(recipes).toEqual([{id: expect.anything(),...recipe}])
  })

  xit('adds a recipe to the database', async () => {

    await addRecipe(recipe)
    const recipes = await client.query('SELECT * FROM recipe')
    expect(recipes.rows).toEqual([expect.objectContaining(recipe)])
  })

  xit('deletes a recipe from the database', async () => {
    const recipeSaved = await addRecipe(recipe)
    await deleteRecipe(recipeSaved.id)
    const recipes = await client.query('SELECT * FROM recipe')
    expect(recipes.rows).toEqual([])
  })

  xit('deletes the correct recipe from the database', async () => {
    const recipe2 = {authorId: 1, recipeName: "Thai Red curry with rice", picture: "url", recipeDescription: "yummy!", method: "Boil the water in a pan...", cuisineId: 1}
    await addRecipe(recipe)
    const recipeSaved2 = await addRecipe(recipe2)
    await deleteRecipe(recipeSaved2.id)
    const recipes = await client.query('SELECT * FROM recipe')
    expect(recipes.rows).toEqual([expect.objectContaining({author_id: 1, recipe_name: "Thai Green curry with rice", picture: "url", recipe_description: "yummy!", method: "Boil the water in a pan...", cuisine_id: 1})])
  })

  afterEach(async () => {
    await cleanDb(client);
    return await client.end();
  })
}) 