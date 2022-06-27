import { Client } from 'pg';

export default async function executeQuery(sql: string, values: any[]){
  const client = new Client({
    user: 'postgres',
    password: 'password',
    database: 'tasty_bot'
  })
  try {
    await client.connect()
  } catch (error) {
    console.error(error, 'error');
  }
  
  const something = await client.query(sql, values)
  await client.end()
  return something
}