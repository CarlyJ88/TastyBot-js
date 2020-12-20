import executeQuery from "./db"

interface Ingredients {
  ingredient_name: string;
  quantity: number;
  unit: string;
}

interface IngredientsSaved extends Ingredients {
  id: string;
}

export async function listIngredients(): Promise<IngredientsSaved[]> {
  const results = await executeQuery('SELECT * FROM current_stock', []);
  return results.rows.map((row: any) => ({ id: row.id, ingredient_name: row.ingredient_name, quantity: row.quantity, unit: row.unit }))
}

export async function addIngredient(ingredient: Ingredients): Promise<IngredientsSaved> {
  const result = await executeQuery('INSERT INTO current_stock(ingredient_name, quantity, unit, created_at, updated_at) VALUES($1, $2, $3, $4, $5) RETURNING *', [ingredient.ingredient_name, ingredient.quantity, ingredient.unit, new Date(), new Date()]);
  return { id: result.rows[0].id, ingredient_name: result.rows[0].ingredient_name, quantity: result.rows[0].quantity, unit: result.rows[0].unit };
}

export async function deleteIngredient(id: String): Promise<void> {
  await executeQuery('DELETE FROM current_stock WHERE id = $1', [id]);
}
