import executeQuery from "./db"

interface RecipeIngredients {
  ingredientName: string;
  quantity: number;
  unit: string;
  recipeId: number;
}

interface RecipeIngredientsSaved extends RecipeIngredients {
  id: number;
}

export async function listRecipeIngredients(): Promise<RecipeIngredientsSaved[]> {
  const results = await executeQuery('SELECT * FROM recipe_ingredients', []);
  return results.rows.map((row: any) => ({ id: row.id, ingredientName: row.ingredient_name, quantity: row.quantity, unit: row.unit, recipeId: row.recipe_id }))
}

export async function addRecipeIngredient(ingredient: RecipeIngredients): Promise<RecipeIngredientsSaved> {
  const result = await executeQuery('INSERT INTO recipe_ingredients(ingredient_name, quantity, unit, recipe_id) VALUES($1, $2, $3, $4) RETURNING *', [ingredient.ingredientName, ingredient.quantity, ingredient.unit, ingredient.recipeId]);
  return { id: result.rows[0].id, ingredientName: result.rows[0].ingredient_name, quantity: result.rows[0].quantity, unit: result.rows[0].unit, recipeId: result.rows[0].recipe_id };
}

export async function deleteRecipeIngredient(id: number): Promise<void> {
  await executeQuery('DELETE FROM recipe_ingredients WHERE id = $1', [id]);
}
