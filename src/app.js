import express from "express"
const app = express()
app.use(express.json())

app.post('/add', (req, res) =>{
  res.json(req.body)  
})

app.get('/list', (req, res) =>{
  res.json([{name: 'beetroot', quantity: '50', unit: 'g'}, {name: 'sweet potato', quantity: '500', unit: 'g'}, {name: 'peppers', quantity: '100', unit: 'g'}])
})

export default app
