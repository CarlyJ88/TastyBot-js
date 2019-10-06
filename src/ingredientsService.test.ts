import listIngredients from "./ingredientsService"
import { Client } from 'pg'

describe('list ingredients', () => {
  const values = ["name", 1, "unit", new Date(), new Date()]
  it('returns list of ingredients from the database', async () => {
    const client = new Client({
      user: 'carlyjenkinson',
      database: 'mymealapp_test'
    })
    await client.connect()

    client.query('DELETE FROM current_stock')
    client.query('INSERT INTO current_stock(ingredient_name, quantity, unit, created_at, updated_at) VALUES($1, $2, $3, $4, $5) RETURNING *', values)
    expect(await listIngredients()).toEqual([{name: "name", quantity: 1, unit: "unit"}])
  })
})