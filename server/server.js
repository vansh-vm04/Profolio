const express = require('express')
const app = express();
const port = 3000
const userRoutes = require('./routes/userRoutes')
const portfolioRoutes = require('./routes/resumeRoutes')
const bodyparser = require('body-parser')
const uploadRoutes = require('./routes/uploadRoutes')
const cors = require('cors');

app.use(cors());

app.use(
  cors({
    origin: process.env.FRONTEND_DOMAIN,
    methods: ["POST","GET","PUT","DELETE"],
  })
);

app.use(bodyparser.json());

app.use('/api/cloudinary',uploadRoutes)

app.use('/api/portfolio',portfolioRoutes);

app.use('/user',userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Express connected on port ${port}`)
})