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
    this.state = { items: [], description: '', priority: 0, status: '', filtrob: false, dueDate: new Date() };
    this.handleChange = this.handleChange.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleStatus=this.handleStatus.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  updateList() {
    fetch('https://taskplannerback.herokuapp.com/api/Task')
      .then(response => response.json())
      .then(data => {
        let tasksList = [];
        data.forEach(function (task) {
          tasksList.push({
            id: task.id,
            description: task.description,
            status: task.state,
            priority: task.priority,
            dueDate: task.dueDate,
            propietario: task.propietario
          })

        });
        this.setState({ items: tasksList });
      });
  }
  getId(){
    axios.get('https://taskplannerback.herokuapp.com/api/CUser/'+localStorage.getItem("mailLogged"))
      .then(res => {
        localStorage.setItem("nameLogged",res.data.name);
      })
  }   
  

  componentDidMount() {
    this.updateList();
    this.getId();
  }

  checkdata(items) {
    this.lista.push(items);
    localStorage.setItem("list", JSON.stringify(this.lista));
  }
  handleSearch(event) {
    this.setState({ filtrob: true });
  }

  render() {
    
    const estados = [
      {
        value: 'In review',
        label: 'In review',
      },
      {
        value: 'In progress',
        label: 'In progress',
      },
      {
        value: 'Terminated',
        label: 'Terminated',
      },
    ];

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
              label="Descripcion"
              id="description"
              value={this.state.description}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              type="number"
              label="priority"
              id="priority"
              value={this.state.priority}
              onChange={this.handleChange}
              margin="normal"
            />
            <TextField
              select
              id="status"
              label="Status"
              value= {this.state.status}
              onChange={this.handleStatus}
              margin="normal"
              InputProps={{
                startAdornment: <InputAdornment position="start">Status</InputAdornment>,
              }}
            >
              {estados.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>

              <KeyboardDatePicker
                margin="normal"
                id="date"
                label="Date"
                format="MM/dd/yyyy"
                value={this.state.dueDate}
                selected={this.state.dueDate}
                onChange={this.handleDate}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
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
    this.setState({ description: document.getElementById('description').value })
    this.setState({ priority: document.getElementById('priority').value });;
  }


  handleDate(e) {
    this.setState({ dueDate: e });
  }

  handleStatus(e) {
    this.setState({ status: e.target.value});
  };

  handleSubmit(e) {
    e.preventDefault();
    const newItem = {
      description: this.state.description,
      priority: this.state.priority,
      dueDate: this.state.dueDate,
      state: this.state.status,
      id: uuid(),
      propietario: {id:2,name:localStorage.getItem("nameLogged"), email:localStorage.getItem("mailLogged"), },
    };
    axios.post('https://taskplannerback.herokuapp.com/api/Task',newItem).then(res=>{
    this.updateList();
    });
  }
}
export default TodoApp;