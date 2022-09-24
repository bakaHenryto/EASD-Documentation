const express = require('express');

require('dotenv').config({path:'./.env'})

const app = express();
app.use(express.json());

const attendance = require('./route/api/attendance.js');
const auth = require('./route/api/auth.js');
const profile = require('./route/api/profile.js');

app.get('/', (req, res) => res.send('API Running'));

app.use(express.json({extend:false})); //Middleware Initiation 

app.use('/attend',attendance);
app.use('/auth',auth);
app.use('/profile',profile);

const PORT = 4000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));