import express from "express"
import {listIngredients} from "./ingredientsService"

const app = express()
app.use(express.json())

app.post('/add-ingredient', (req, res) =>{
  res.json(req.body)  
})

app.get('/list', async(req, res) =>{
  res.json(await listIngredients())
})

app.post('add-recipe-ingredients', (req, res) => {
  res.json(req.body)
})

export default app
