import executeQuery from './db';

describe('connect', () => {
  it('connects to the database', (async() => {
    await executeQuery('SELECT * FROM current_stock', []);
  }))
})

describe('insert', () => {
  const values = ["name", 1, "unit", new Date(), new Date()]
  it('insert ingredient to the database', (async() => {
    await executeQuery('INSERT INTO current_stock(ingredient_name, quantity, unit, created_at, updated_at) VALUES($1, $2, $3, $4, $5) RETURNING *', values);
  }))
})