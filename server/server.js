const express = require('express')
const app = express();
const port = 3000
const userRoutes = require('./routes/userRoutes')
const portfolioRoutes = require('./routes/resumeRoutes')
const uploadRoutes = require('./routes/uploadRoutes')
const cors = require('cors');
const {dbConnect} = require('./config/db')
const helmet = require("helmet");
const mongoose = require('mongoose')

app.use(
  helmet({
    crossOriginOpenerPolicy: { policy: "same-origin-allow-popups" },
  })
);

app.use(
  cors({
    origin: process.env.FRONTEND_DOMAIN,
    methods: ["POST","GET","PUT","DELETE","OPTIONS"],
    credentials: true,
  })
);

app.options("*", cors());

dbConnect();

app.use(express.json());

app.use('/api/cloudinary',uploadRoutes)

app.use('/api/portfolio',portfolioRoutes);

app.use('/user',userRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/ready', async(req,res)=>{
    try {
      const dbState = mongoose.connection.readyState;
      if(dbState == 1){
        res.sendStatus(200);
      }else{
        res.sendStatus(500);
      }
    } catch (error) {
      res.sendStatus(500);
    }
})

app.listen(port, () => {
  console.log(`Express connected on port ${port}`)
})