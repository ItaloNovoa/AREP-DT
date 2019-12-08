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
        this.state = { items: [], cedula: '',  back:false };
        this.handleChange = this.handleChange.bind(this);
        this.handleBack = this.handleBack.bind(this);        
        this.handleSearch= this.handleSearch.bind(this);
        this.avoid=this.avoid.bind(this);
        this.lista=[];           
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
                this.lista= cardList ;            
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
        
        if (this.state.back) {
            return <Redirect to={{
                pathname: '/miniDrawer',
            }}
            />
        };
        return (
            <div>
                <Card >
                    <h2>Datos buscar tarjetas</h2>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            required
                            type="text"
                            label="cedula"
                            id="cedula"
                            value={this.state.cedula}
                            onChange={this.handleChange}
                            margin="normal"
                        />

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
                    <h2>Lista de tarjetas</h2>
                        <TodoList items={this.state.items} /> 
                </Card >
            </div>


        );
    }
    handleChange(e) {
        this.setState({ cedula: document.getElementById('cedula').value });
    }


   
    handleBack(event){
        this.setState({ back: true });
    }
    avoid(event){
        
    }
    handleSearch(event){
        this.state.items=[]
        var a =false;
        for (var i=0; i < this.lista.length; i++) {
            if(this.lista[i].id===this.state.cedula){
                a=true;
                const newItem = {
                    id: this.lista[i].id,
                    compañia: this.lista[i].compañia,
                    nombre: this.lista[i].nombre,
                    dueDate: this.lista[i].dueDate,
                    description: this.lista[i].description,
                    puntuacion: this.lista[i].puntuacion
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
}
export default filtro;