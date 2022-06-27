import { Client } from 'pg'

let id =0

export async function cleanDb(client: Client){
    await client.query('DELETE FROM recipe_ingredients')
    console.log('recipe_ingredients', id)
    await client.query('DELETE FROM recipe')
    console.log('recipe', id)
    await client.query('DELETE FROM users')
    console.log('users', id)
    await client.query('DELETE FROM cuisine');
    console.log('cuisine', id);
    id++;
    
}