import executeQuery from "./db"

interface Ingredients {
  ingredient_name: string;
  quantity: number;
  unit: string;
  link: string;
}

interface IngredientsSaved extends Ingredients {
  id: number;
}

export async function listIngredients(): Promise<IngredientsSaved[]> {
  const results = await executeQuery('SELECT * FROM current_stock', []);
  return results.rows.map((row: any) => ({ id: row.id, ingredient_name: row.ingredient_name, quantity: row.quantity, unit: row.unit, link: row.link }))
}

export async function addIngredient(ingredient: Ingredients): Promise<IngredientsSaved> {
  const result = await executeQuery('INSERT INTO current_stock(ingredient_name, quantity, unit, link) VALUES($1, $2, $3, $4) RETURNING *', [ingredient.ingredient_name, ingredient.quantity, ingredient.unit, ingredient.link]);
  return { id: result.rows[0].id, ingredient_name: result.rows[0].ingredient_name, quantity: result.rows[0].quantity, unit: result.rows[0].unit, link: result.rows[0].link };
}

export async function deleteIngredient(id: number): Promise<void> {
  await executeQuery('DELETE FROM current_stock WHERE id = $1', [id]);
}
