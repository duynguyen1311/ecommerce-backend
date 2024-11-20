const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

/*app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true
}));*/
app.use(bodyParser.json());

app.use(cookieParser);
app.use('/', (req,res) => {
    res.send("Hello");
})
app.use('/api', require('./routes/authRoutes'));
app.listen( port,() => console.log(`Listening on port : ${port}`));