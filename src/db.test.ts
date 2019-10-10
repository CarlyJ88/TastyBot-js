import executeQuery from './db';
import { Client } from 'pg'

describe('connect', () => {
  it('connects to the database', async() => {
    await executeQuery('SELECT * FROM current_stock', []);
  })
})

describe('insert', () => {

  beforeEach(async () => {
    const client = new Client({
      user: 'carlyjenkinson',
      database: 'mymealapp_test'
    })
    await client.connect()
    .then(()=> {
      client.query('DELETE FROM current_stock')
  })

  const values = ["name2", 2, "unit2", new Date(), new Date()]
  
  it('insert ingredient to the database', async() => {
    const a = await executeQuery('INSERT INTO current_stock(ingredient_name, quantity, unit, created_at, updated_at) VALUES($1, $2, $3, $4, $5) RETURNING *', values);
    console.log(a);
    expect(a).toBeDefined();
  })

afterEach(async () => {
  await client.query('DELETE FROM current_stock')
  await client.end();
  });
})
})