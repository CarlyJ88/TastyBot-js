import executeQuery from "./db"

interface Ingredients {
  ingredient_name: string;
  quantity: number;
  unit: string;
  link: string;
  categories: string;
}

interface IngredientsSaved extends Ingredients {
  id: number;
}

export async function listIngredients(): Promise<IngredientsSaved[]> {
  const results = await executeQuery('SELECT * FROM current_stock', []);
  return results.rows.map((row: any) => ({ id: row.id, ingredient_name: row.ingredient_name, quantity: row.quantity, unit: row.unit, link: row.link, categories: row.categories }))
}

export async function addIngredient(ingredient: Ingredients): Promise<IngredientsSaved> {
  const result = await executeQuery('INSERT INTO current_stock(ingredient_name, quantity, unit, link, categories) VALUES($1, $2, $3, $4, $5) RETURNING *', [ingredient.ingredient_name, ingredient.quantity, ingredient.unit, ingredient.link, ingredient.categories]);
  return { id: result.rows[0].id, ingredient_name: result.rows[0].ingredient_name, quantity: result.rows[0].quantity, unit: result.rows[0].unit, link: result.rows[0].link, categories: result.rows[0].categories };
}

export async function deleteIngredient(id: number): Promise<void> {
  await executeQuery('DELETE FROM current_stock WHERE id = $1', [id]);
}

export async function editIngredient(ingredients: IngredientsSaved): Promise<IngredientsSaved> {
  console.log('am i here')
  const ingredient = await executeQuery('UPDATE current_stock SET ingredient_name = $1, quantity = $2, unit = $3, link = $4, categories = $5 WHERE id = $6 RETURNING *', [ingredients.ingredient_name, ingredients.quantity, ingredients.unit, ingredients.link, ingredients.categories, ingredients.id]);
  return { id: ingredient.rows[0].id, ingredient_name: ingredient.rows[0].ingredient_name, quantity: ingredient.rows[0].quantity, unit: ingredient.rows[0].unit, link: ingredient.rows[0].link, categories: ingredient.rows[0].categories };
}
