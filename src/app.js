import express from "express"
const app = express()
app.use(express.json())

app.post('/add', (req, res) =>{
  res.json(req.body)  
}
)

export default app