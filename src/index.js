
//001
//git branch -m main
//git add .
//git commit -m "..."
//git remote add origin https://github.com/JGomez49/MERN-task.git
//git push -u origin main

const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const {mongoose} = require('./database');


//-------------------- Settings ---------------------
app.set('port', process.env.PORT || 3000);

//---------------------------------------------------



//------------------ Middlewares --------------------
app.use(morgan('dev'));
app.use(express.json());

//---------------------------------------------------



//---------------------- Routes ---------------------
app.use('/api/tasks', require('./routes/task.routes'));
//---------------------------------------------------



//------------------- Static Files ------------------
// console.log(path.join(__dirname , 'public'));
let ruta_public = path.join(__dirname , 'public');
app.use(express.static(ruta_public));
//---------------------------------------------------



//----------------- Start the Server ----------------
let puerto = app.get('port');
app.listen(puerto, ()=>{
    console.log(`Escuchando en el puerto ${puerto}...`);
});
//---------------------------------------------------
