import { getData } from './getData.js'
import { getSchema } from './getSchema.js'

// Start up an express app to listen for requests from the frontend
import express from "express"
const app = express()
app.use(express.static( 'public'))

// API endpoint to route data requests from the frontend
app.get('/data', async (req, res) => {    
   let data = await getData()
   res.send(data)
})

// API endpoint to route schema requests from the frontend
app.get('/schema', async (req,res)=>{ 
  let schema = await getSchema()
  res.send(schema) 
})

const port = process.env.PORT || 3001
// Start listening for requests.
app.listen(port, ()=>{
  console.log("Express is live.")
})

