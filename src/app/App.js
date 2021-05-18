import React, { Component } from 'react';

class App extends Component {

    constructor(){
        super();
        this.state = {
            title: '',
            description: '',
            _id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    //Para reusar el mismo formulario en caso de Editar y Agregar
    //se incluyo la propiedad _id en el constructor, asi si
    //id existe, entonces lo que se quiere es Editar, pero si
    //no existe, eonteces se quiere es agregar nueva tarea.
    addTask(e){
        //Edit (PUT)
        if(this.state._id){
            // document.getElementById('btnOK').innerHTML = "Edit"
            fetch('/api/tasks/'+this.state._id, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                //sacar un aviso
                M.toast({html: 'Task Updated'})
                //limpiar datos
                this.setState({
                    title: '',
                    description: '',
                    _id: ''
                })
                this.fetchTask();
            })
        }else{
            //Add (POST)
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    M.toast({html: 'Task Saved!'});
                    this.setState({
                        title: '',
                        description:'',
                        tasks:[]
                    })
                    this.fetchTask();
                })
                .catch(err => console.error(err))
        }
        e.preventDefault();
    }

    componentDidMount(){
        this.fetchTask();
    }

    //obtener tareas
    fetchTask(){
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
            console.log(data);
            this.setState({tasks: data});
            // console.log(this.state.tasks);
            // let arreglo = this.state.tasks;
            // console.log(arreglo);
            // console.log(arreglo[0].title);
            document.getElementById('btnOK').innerHTML = "Add Task"
        });
    }

    deleteTask(id){
        if (confirm('Are you sure to delete this task?')){
            console.log('Eliminando...'+id);
            fetch('/api/tasks/'+id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            M.toast({html: 'Task Deleted!'})
            this.fetchTask();
        })
        } 
    }

    //Esta funcion solo llena el formulario con los datos del task
    //despues, la funcion addTask es la encargada de actualizar o
    //agrear nueva tarea.
    editTask(id){
        document.getElementById('btnOK').innerHTML = "Edit"
        console.log('Editando...'+id);
        fetch('/api/tasks/'+id)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                //se cambia el estado para llenar el formulario
                //con setState
                this.setState({
                    title: data.title,
                    description: data.description,
                    _id: data._id
                })
            })
    }

    handleChange(e){
        const {name,value} = e.target;
        this.setState({
            [name]:value
        });
    }

    render() {
        let arreglo = this.state.tasks;
        let toRender;
        if (arreglo){
            toRender = arreglo.map(task => {
                return (           
                    <tr key={task._id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>
                            <button 
                                className="btn light-blue darken-4"
                                style={{margin: '4px'}}
                                onClick={()=>this.deleteTask(task._id)}>
                                <i className="material-icons">delete</i>
                            </button>
                            <button 
                                className="btn light-blue darken-4"
                                style={{margin: '4px'}}
                                onClick={()=>this.editTask(task._id)}>
                                <i className="material-icons">edit</i>
                            </button>
                        </td>
                    </tr>                        
                )
            })
        }
        
        return (
            <div>
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">MERN stack</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">

                                    <form onSubmit={this.addTask} >

                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input 
                                                    name="title"
                                                    type="text" 
                                                    placeholder="Task Title"
                                                    onChange={this.handleChange}
                                                    value={this.state.title}
                                                />
                                            </div>
                                        </div>                                        
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea
                                                    name="description"
                                                    className="materialize-textarea"
                                                    placeholder="Description"
                                                    id="" 
                                                    cols="30" 
                                                    rows="10"
                                                    onChange={this.handleChange}
                                                    value={this.state.description}>
                                                </textarea>
                                            </div>
                                        </div>
                                        <button 
                                            type="submit" 
                                            className="btn light-blue darken-4"
                                            id="btnOK"
                                            >Add Task</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {toRender}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>  
        )
    }
}

export default App;