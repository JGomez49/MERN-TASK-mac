//05
//npm i mongoose
//go to database.js

//07
const mongoose = require('mongoose');
//En este momento la DB ya esta conectada, ahora falta
//modelar los datos
const { Schema } = mongoose;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Task', TaskSchema);