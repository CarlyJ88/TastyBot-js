import express from "express"
import {listIngredients, addIngredient, deleteIngredient, editIngredient} from "./ingredientsService"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.post('/add-ingredient', async(req, res) => {
  const ingredient = req.body
  console.log(req.body, 'req.body')
  const passBack = await addIngredient(ingredient)
  res.json(passBack)
})

app.delete('/delete-ingredient', async(req, res) => {
  const id = req.body.id
  console.log(req.body, 'req.body')
  console.log(id)
  const comingBack = await deleteIngredient(id)
  res.json(comingBack)
})

app.get('/list', async(req, res) =>{
  res.json(await listIngredients())
})

app.put('/edit-ingredient', async(req, res) => {
  const ingredient = req.body
  console.log(ingredient, 'ingredient')
  const passBack = await editIngredient(ingredient)
  res.json(passBack)
})

// app.post('add-recipe-ingredients', async (req, res) => {
//   const ingredient = req.body
//   console.log(req.body, 'req.body')
//   const passBack = await addRecipeIngredient(ingredient)
//   res.json(passBack)
// })

// app.delete('/delete-recipe-ingredient', async(req, res) => {
//   const id = req.body.id
//   console.log(req.body, 'req.body')
//   console.log(id)
//   const comingBack = await deleteRecipeIngredient(id)
//   res.json(comingBack)
// })

// app.post('add-recipe'), (req, res) => {
//   const recipe = req.body
//   console.log(req.body, 'req.body')
//   const passBack = await addRecipeIngredient(recipe)
//   res.json(passBack)
// })



export default app


// 1. res.json = sets the response body to the parameter as a json string
// 2. the req.body is an ingredient json object
// so you need to send the ingredient to be saved

// request is coming from the client
// response is going to the client