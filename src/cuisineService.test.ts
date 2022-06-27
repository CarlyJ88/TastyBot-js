import { listCuisine } from "./cuisineService"
import { Client } from 'pg'
import { cleanDb } from "./testHelper/cleanDb";

describe('list cuisine', () => {
  const cuisineName = "indian";
  const cuisineId = 1;
  const values = [cuisineId, cuisineName]
  let client:Client;

  beforeEach(async ()=>{
    client = new Client({
      user: 'postgres',
      password: 'password',
      database: 'tasty_bot_test'
    }) 
    await client.connect()
    await cleanDb(client);
    return await client.query('DELETE FROM cuisine')
  });

  it('returns list of ingredients from the database', async () => {
    await cleanDb(client);
    await client.query('INSERT INTO cuisine(id, cuisine_name) VALUES($1, $2) RETURNING *', values)
    const cuisine = await listCuisine()  
    expect(cuisine.length).toEqual(1);
    expect(cuisine).toEqual([{id: cuisineId, cuisineName}])
  })

  afterEach(async () => {
    await cleanDb(client);
    return await client.end();
  })
}) 