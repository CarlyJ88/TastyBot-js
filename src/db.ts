import { Client } from 'pg';

export default async function executeQuery(sql: string, values: any[]){
  const client = new Client({
    user: 'carlyjenkinson',
    database: 'mymealapp_test'
  })
  await client.connect()

  const something = await client.query(sql, values)
  await client.end()
  return something

}