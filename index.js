const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')
const config = require("./config")
connectToMongo();

const app = express()
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));
app.use(cors())

//Available Routes

app.use('/api/auth',require('./routes/auth'))
app.use('/api/course',require('./routes/course'))
app.use('/api/video',require('./routes/video'))
app.use('/api/comments',require('./routes/comments'))
app.use('/api/notes',require('./routes/notes'))
app.use('/api/blogs',require('./routes/blog'))
app.use('/api/fileupload',require('./routes/file'))


app.listen(config.port, () => {
  console.log(`LowCodeLounge listening on port ${config.port}`)
})