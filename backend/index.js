const connectToMongo = require('./db');

connectToMongo();
const express = require('express')
const cors = require('cors') 
const app = express()
const port = 5000
const path = require('path')
const NODE_ENV = "production"

app.use(cors())
app.use(express.json())
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
app.use('/api/posts', require('./routes/posts'))

const __dirname1 = path.resolve();
if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1,'/frontend/build')));

  app.get("*",(req,res)=> {
    res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"))
  });
} else {
  app.get("/",(req,res)=>{
    res.send("Api is Running")
  });
}
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})