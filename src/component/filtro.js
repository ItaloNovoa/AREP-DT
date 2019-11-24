import React from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import "react-datepicker/dist/react-datepicker.css";
import { Container, Button, darkColors } from 'react-floating-action-button'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import { TodoList } from './TodoList'
import { Redirect } from "react-router-dom";
import Fab from '@material-ui/core/Fab';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';

class filtro extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], name: '', status: '', dueDate: new Date(), back:false };
        this.handleChange = this.handleChange.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleBack = this.handleBack.bind(this);        
        this.handleSearch= this.handleSearch.bind(this);
        this.avoid=this.avoid.bind(this);
        this.lista=[];           
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
            this.lista= tasksList ;
          });
      }
      componentDidMount() {
        this.updateList();
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
        
        if (this.state.back) {
            return <Redirect to={{
                pathname: '/miniDrawer',
            }}
            />
        };
        return (
            <div>
                <h2>Lista de tarjetas</h2>

                
            <TodoList items={this.state.items} /> 


                <Card >
                    <h2>Datos buscar tarjetas</h2>
                    <form onSubmit={this.handleSubmit}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                margin="normal"
                                id="date"
                                label="fecha buscada"
                                format="MM/dd/yyyy"
                                value={this.state.dueDate}
                                selected={this.state.dueDate}
                                onChange={this.handleDate}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <TextField
                            required
                            type="text"
                            label="name"
                            id="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                            margin="normal"
                        />
                        <TextField
                            select
                            id="status"
                            label="Status"
                            value={this.state.status}
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

                        <Container>
                            <Fab tooltip="filtrar" color="primary" aria-label="add" onClick={this.handleSearch} className={useStyles.fab1}>
                              <SearchIcon />
                            </Fab>
                            <Button
                                label="status"
                                tooltip="volver al menu"
                                styles={{ backgroundColor: darkColors.blue, color: darkColors.white }}
                                onClick={this.handleBack}>
                                    <LeftIcon />
                            </Button>

                        </Container>
                    </form>
                </Card >
            </div>


        );
    }
    handleChange(e) {
        this.setState({ name: document.getElementById('name').value });
    }


    handleDate(e) {
        this.setState({ dueDate: e });
    }
    handleBack(event){
        this.setState({ back: true });
    }
    handleStatus(e) {
        this.setState({ status: e.target.value});
      };
    avoid(event){
        
    }
    handleSearch(event){
        this.state.items=[]
        var a =false;
        for (var i=0; i < this.lista.length; i++) {
            if(this.igualarFechas(this.lista[i].dueDate,this.state.dueDate) && this.lista[i].propietario.name===this.state.name  && this.lista[i].status===this.state.status){
                a=true;
                const newItem = {
                    description: this.lista[i].description,
                    name: this.lista[i].name,
                    priority: this.lista[i].priority,
                    status: this.lista[i].status,
                    dueDate: this.lista[i].dueDate,
                    propietario: this.lista[i].propietario,
                  }; 
                this.setState(prevState => ({
                    items: prevState.items.concat(newItem),
                    text: ''
                }));
            }
        }
        if(!a){
            alert("No hay cartas con estos valores");
        }
    }

    igualarFechas(a,b){
        if(new Date(a).getDate===b.getDate){
            if(new Date(a).getMonth===b.getMonth){
                if(new Date(a).getFullYear===b.getFullYear){
                    return true;
                }
            }                
        }
        return false;
    }
}
export default filtro;