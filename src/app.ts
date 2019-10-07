import express from "express"
import {listIngredients} from "./ingredientsService"
import { Pool, Client } from 'pg'

const app = express()
app.use(express.json())

app.post('/add', (req, res) =>{
  res.json(req.body)  
})

app.get('/list', (req, res) =>{
  res.json(listIngredients())
})

export default app
