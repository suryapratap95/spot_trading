const express = require('express')
const app = express()
const port = 8000
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')
const redisServices = require('./services/redisServices')
app.use(express.json())

mongoose.connect('mongodb+srv://SuryaSingh095:EyXLF2U5udIQKtUG@trueweb3.1u56fq7.mongodb.net/?retryWrites=true&w=majority&appName=TrueWeb3', { useNewUrlParser: true, useUnifiedTopology: true })

app.use('/api/users', userRoutes)


//redisServices.setCache('testkey', 'testvalue')
redisServices.getCache('testkey').then((data) => {
  console.log(data)
})
redisServices.setCache('testkey', 'testvalue')
app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})