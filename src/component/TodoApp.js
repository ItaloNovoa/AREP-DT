import React from 'react';
import { TodoList } from './TodoList'
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import "react-datepicker/dist/react-datepicker.css";
import { Container, Button, darkColors } from 'react-floating-action-button'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router-dom";
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import uuid from 'react-uuid';
import axios from 'axios';


class TodoApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = { items: [], id: '', nombre: '',description:'',puntuacion:'', filtrob: false,dueDate:new Date().getDate()};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  updateList() {
    fetch('http://localhost:8080/Carta')
      .then(response => response.json())
      .then(data => {
        let cardList = [];
        data.forEach(function (card) {
          cardList.push({
            id: card.cedula,
            compañia: card.compañia,
            nombre: card.nombre,
            dueDate: card.fechaDespido,
            description: card.descripcion,
            puntuacion: card.puntuacion
          })

        });
        this.setState({ items: cardList });
      });
  }   
  

  componentDidMount() {
    this.updateList();
  }

  checkdata(items) {
    this.lista.push(items);
    localStorage.setItem("list", JSON.stringify(this.lista));
  }
  handleSearch(event) {
    this.setState({ filtrob: true });
  }

  render() {
    
    

    const useStyles = makeStyles(theme => ({
      root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      },
      fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        left: theme.spacing(-5),
      },
      fab1: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(5),
      },

    }));
    if (this.state.filtrob) {
      return <Redirect to={{
        pathname: '/filtro'
      }} />
    };
    return (
      <div>    
        <Card >
          <h2>Datos nuevo Despido</h2>
          <form onSubmit={this.handleSubmit}>
          <TextField
              type="text"
              label="cedula"
              id="cedula"
              value={this.state.id}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              type="text"
              label="nombre"
              id="nombre"
              value={this.state.nombre}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              type="number"
              label="puntuacion"
              id="puntuacion"
              value={this.state.puntuacion}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              type="text"
              label="Descripcion"
              id="description"
              value={this.state.description}
              onChange={this.handleChange}
              margin="normal"
            />            
            <Container>
              <Fab tooltip="Buscar Empleado en base general" color="primary" aria-label="add" onClick={this.handleSearch} className={useStyles.fab1}>
                <SearchIcon />
              </Fab>
              <Button
                label="status"
                tooltip="añadir despido"
                styles={{ backgroundColor: darkColors.blue, color: darkColors.white }}
                onClick={this.state.items.length + 1}>
                <font size="8">+</font>
              </Button>
            </Container>
          </form>
        </Card >
        <h2>Despidos en mi empresa</h2>
        <TodoList items={this.state.items} />
      </div>

    );



  }


  handleChange(e) {
    this.setState({ id: document.getElementById('cedula').value })
    this.setState({ description: document.getElementById('description').value })
    this.setState({ nombre: document.getElementById('nombre').value });;
    this.setState({ puntuacion: document.getElementById('puntuacion').value })
  }



  handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      cedula: this.state.id,
      compañia: localStorage.getItem('nameLogged'),
      nombre: this.state.nombre,
      fechaDespido: this.state.dueDate,
      descripcion: this.state.description,
      puntuacion: this.state.puntuacion,
    };
    axios.post('http://localhost:8080/Carta',newItem).then(res=>{
    this.updateList();
    });
  }
}
export default TodoApp;