import executeQuery from "./db"

interface Cuisine {
  id: number;
  cuisineName: string;
}

export async function listCuisine(): Promise<Cuisine[]> {
  const results = await executeQuery('SELECT * FROM cuisine', []);
  return results.rows.map((row: any) => ({ id: row.id, cuisineName: row.cuisine_name }))
}
