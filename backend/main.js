/* call package */
const express = require('express');
const dotEnv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');



/* call package function */
const app = express();
dotEnv.config({
    path : path.join(__dirname , 'config' , '.env')
});



/* call inbuild middleware */
app.use(express.json());
app.use(express.urlencoded( { extended:true } ));
app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
const allowedOrigins = process.env.FRONTEND_URL.split(',');
app.use(cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,  // Allow credentials
}));



/* Call another files */
const { connectDatabase } = require('./config/database');
const { signinRouter } = require('./routes/user.route');
const { fileRouter } = require('./routes/file.route');



/* Call another files functions*/
connectDatabase();
app.use('/' , signinRouter);
app.use('/' , fileRouter);

app.get('/test', (req, res) => {
  res.send('This is the backend home route!!');
});



/* app listen */
app.listen(process.env.PORT , () => {
    console.log(`Server is Running on ${process.env.PORT} PORT in ${process.env.NODE_ENV} Environment.`);
}).on('error' , (error) => {
    console.log(error.message);
});