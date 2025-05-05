const express = require('express')
const app = express();
const port = 3000
const db = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const resumeRoutes = require('./routes/resumeRoutes')
const bodyparser = require('body-parser')
const {jwtAuthMiddleware} = require('./middlewares/authMiddleware')
const cors = require('cors');

app.use(cors());

app.use(
  cors({
    origin: process.env.FRONTEND_DOMAIN,
    methods: ["POST"],
    exposedHeaders: ["Resumes"], 
  })
);

app.use(bodyparser.json());

app.use('/resume',resumeRoutes);

app.use('/user',userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Express connected on port ${port}`)
})