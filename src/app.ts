import express from "express"
import {listIngredients, addIngredient} from "./ingredientsService"

const app = express()
app.use(express.json())

app.post('/add-ingredient', async(req, res) =>{
  const ingredient = req.body
  const passBack = await addIngredient(ingredient)
  res.json(passBack)
})

app.get('/list', async(req, res) =>{
  res.json(await listIngredients())
})

app.post('add-recipe-ingredients', (req, res) => {
  res.json(req.body)
})

export default app


// 1. res.json = sets the response body to the parameter as a json string
// 2. the req.body is an ingredient json object
// so you need to send the ingredient to be saved

// request is coming from the client
// response is going to the client