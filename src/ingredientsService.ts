import executeQuery from "./db"

interface Ingredients{
  name: string;
  quantity: number;
  unit: string;
}

export default async function listIngredients() : Promise < Ingredients[] >{
  const results = await executeQuery('SELECT * FROM current_stock', []);
  return results.rows.map( (row:any) =>({name: row.ingredient_name, quantity: row.quantity, unit: row.unit}))
}