import executeQuery from "./db"

// need to add a service that states how healthy the recipe is
// I want it to read like a series of questions rather than just loads of tick boxes at the top; make it pretty


interface Recipe {
  authorId: number;
  recipeName: string;
  picture: string;
  recipeDescription: string;
  method: string;
  cuisineId: number;
}

interface RecipeSaved extends Recipe {
  id: number;
}

export async function listRecipe(): Promise<RecipeSaved[]> {
  const results = await executeQuery('SELECT * FROM recipe', []);
  return results.rows.map((row: any) => ({ id: row.id, authorId: row.author_id, recipeName: row.recipe_name, picture: row.picture, recipeDescription: row.recipe_description, method: row.method, cuisineId: row.cuisine_id }))
}

export async function addRecipe(ingredient: Recipe): Promise<RecipeSaved> {
  const result = await executeQuery('INSERT INTO recipe(author_id, recipe_name, picture, recipe_description, method, cuisine_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [ingredient.authorId, ingredient.recipeName, ingredient.picture, ingredient.recipeDescription, ingredient.method, ingredient.cuisineId]);
  return { id: result.rows[0].id, authorId: result.rows[0].author_id, recipeName: result.rows[0].recipe_name, picture: result.rows[0].picture, recipeDescription: result.rows[0].recipe_description, method: result.rows[0].method, cuisineId: result.rows[0].cuisine_id };
}

export async function deleteRecipe(id: number): Promise<void> {
  await executeQuery('DELETE FROM recipe WHERE id = $1', [id]);
}
