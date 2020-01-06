import executeQuery from "./db"

interface Ingredients{
  name: string;
  quantity: number;
  unit: string;
}

export async function listIngredients() : Promise < Ingredients[] >{
  const results = await executeQuery('SELECT * FROM current_stock', []);
  return results.rows.map( (row:any) =>({name: row.ingredient_name, quantity: row.quantity, unit: row.unit}))
}

export async function addIngredient(ingredient: Ingredients): Promise<Ingredients> {
  const result = await executeQuery('INSERT INTO current_stock(ingredient_name, quantity, unit, created_at, updated_at) VALUES($1, $2, $3, $4, $5) RETURNING *', [ingredient.name, ingredient.quantity, ingredient.unit, new Date(), new Date()]);
  return {name: result.rows[0].name, quantity: result.rows[0].quantity, unit: result.rows[0].unit};
}

export async function deleteIngredient(ingredient: Ingredients): Promise<void> {
  await executeQuery('DELETE FROM current_stock WHERE ingredient_name = $1', [ingredient.name]);
}
