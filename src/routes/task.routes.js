//03
const express = require('express');
const router = express.Router();

//08
const Task_Model = require('../models/task');
//Task_Model es el modelo de los datos en la DB

//para consultar la DB:
//Read (R)
router.get('/', async(req,res)=>{
    // res.send('Hola desde task.routes GET');
    const tasks = await Task_Model.find();
    // console.log(tasks);
    // res.json('Respuestas desde router.get');
    res.json(tasks);
});

//Obtener una sola tarea por ID:
router.get('/:id' , async(req,res)=>{
    const task = await Task_Model.findById(req.params.id);
    res.json(task);
})

//para insertar datos en la DB:
//Create (C)
router.post('/', async(req,res) => {
    // console.log(req.body)
    const { title, description} = req.body;
    const tarea = new Task_Model ({title, description});
    console.log(tarea);
    await tarea.save();
    res.json({
        status: "Tarea gurdada."
    })
});

//Para Editar datos en la DB:
//Update (U)
//Se necesita primero el id del item en la DB
router.put('/:id', async(req,res) => {
    const { title, description } = req.body;
    const newTask = {title, description};
    await Task_Model.findByIdAndUpdate(req.params.id, newTask)
    res.json({
        status: "Tarea actualizada."
    });

});

//Para borrar datos de la BD:
//Delete (D)
//tambien se necesita el id
router.delete('/:id', async(req,res) => {
    await Task_Model.findByIdAndRemove(req.params.id);
    res.json({
        status: "Tarea eliminada."
    });
});

module.exports = router;