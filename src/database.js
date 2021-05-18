//06
const mongoose = require('mongoose');

//========
// require('dotenv').config()
// const port = process.env.PORT || 3000;
// //Conexion a base de datos
// const mongoose = require('mongoose');
// const URI = process.env.MONGODB_URI;
// mongoose.connect(URI, 
//     { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(()=> console.log('---------conectado a mongodb---------')) 
//   .catch(e => console.log('error de conexión', e))
//========

//MongoDB Atlas
MONGODB_URI = 'mongodb+srv://MetaUSER:NuDmqT4Wl3JJKzen@cluster0.g7lcu.mongodb.net/MetaDB?retryWrites=true&w=majority'
const URI = MONGODB_URI;
mongoose.connect(URI, 
    {useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(db => console.log('Base de datos conectada'))
    .catch(err => console.error(err));

module.exports = mongoose;