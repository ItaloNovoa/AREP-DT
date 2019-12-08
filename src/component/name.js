import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Fab from '@material-ui/core/Fab';
import RightIcon from '@material-ui/icons/KeyboardArrowRight';
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';


export class Name extends Component {
    
    checkdata() {
        const tipoEmpresa = document.getElementById("email").value;
        const RUT = document.getElementById("name").value;
        const nombreEmpresa = document.getElementById("last_name").value;
        const password = document.getElementById("password").value;
        const registro =this.state.birthday;
        const tipo =this.state.email;

        const newItem = {
            rut: RUT,
            nameCompany: nombreEmpresa,
            fechaResgistro: registro,
            tipoEmpresa: tipo,
            password: password
        };
        console.log(JSON.stringify(newItem));
        alert(JSON.stringify(newItem));
        axios.post('http://localhost:8080/Company',newItem).then(res=>{
            if (nombreEmpresa !== "" && password !== "") {            
                localStorage.setItem("isLoggedin", true);
                localStorage.setItem("nameLogged",nombreEmpresa);
                this.setState({ Loggin: true });            
            }
        });
         
        
    }

    constructor(props) {
        super(props);
        if (this.props.location.state) {
            this.state = {
                first_name: this.props.location.state.first_name, last_name: this.props.location.state.last_name,
                email: '', birthday: new Date('2014-08-18T21:11:54'), password: '', secondPassword: '', next: false, back: false,
            }

        } else {
            this.state = { first_name: '', last_name: '', email: '', birthday: new Date('2014-08-18T21:11:54'), password: '', secondPassword: '', next: false, back: false };
        }

        this.handleEmail = this.handleEmail.bind(this);
        this.handleBirthday = this.handleBirthday.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSecondPassword = this.handleSecondPassword.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }
    handleFirstName(event) {
        this.setState({ first_name: event.target.value });
    };
    handleLastName(event) {
        this.setState({ last_name: event.target.value });
    };
    handleEmail(event) {
        this.setState({ email: event.target.value });
    };
    handleBirthday(event) {
        this.setState({ birthday: event });
    };
    handlePassword(event) {
        this.setState({ password: event.target.value });
    };
    handleSecondPassword(event) {
        this.setState({ secondPassword: event.target.value });
    };
    handleNext(event) {
        event.preventDefault();
        if (this.state.first_name && this.state.last_name && this.state.password && this.state.password === this.state.secondPassword) {
            this.checkdata();
            this.setState({ next: true });
        }
        else if (this.state.password === this.state.secondPassword) {
            alert("Todos los datos son requeridos")
        }
        else {
            alert("La claves no son iguales")
        }
    }
    
    handleBack(event){
        event.preventDefault();
        this.setState({ back: true });
    }
    handleInputChange(e) {        
          this.setState({
                file: e.target.files[0]
            });             
    }

    render() {

        const estados = [
            {
              value: 'Privada',
              label: 'Privada',
            },
            {
              value: 'Publica',
              label: 'Publica',
            }
          ];

        const divStyle = {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        };
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
        if (this.state.next) {
            return <Redirect to={{
                pathname: '/miniDrawer',
                state: { first_name: this.state.first_name, last_name: this.state.last_name }
            }}
            />
        };
        if (this.state.back) {
            return <Redirect to={{
                pathname: '/',
            }}
            />
        };

        return (
            <div >
                <h1  align="center">Informacion de registro</h1>
               <Container>
               <div className='divStyle1'>
                    <form style={divStyle} >
                        <TextField
                            type="text"
                            label="RUT"
                            id="name"
                            value={this.state.first_name}
                            onChange={this.handleFirstName}
                            margin="normal"
                        />
                        <TextField
                            type="text"
                            label="nombre de la compañia"
                            id="last_name"
                            value={this.state.last_name}
                            onChange={this.handleLastName}
                            margin="normal"
                        />
                        <TextField
                            select
                            type="email"
                            label="Tipo Empresa"
                            id="email"
                            value={this.state.email}
                            onChange={this.handleEmail}
                            margin="normal"
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Tipo</InputAdornment>,
                              }}
                        >{estados.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>

                            <KeyboardDatePicker
                                margin="normal"
                                id="birthday"
                                label="fecha Registro"
                                format="MM/dd/yyyy"
                                value={this.state.birthday}
                                selected={this.state.birthday}
                                onChange={this.handleBirthday}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <TextField
                            type="password"
                            label="Password"
                            id="password"
                            value={this.state.password}
                            onChange={this.handlePassword}
                            margin="normal"
                        />
                        <TextField
                            type="password"
                            label="REPEAT PASSWORD"
                            id="secondPassword"
                            value={this.state.secondPassword}
                            onChange={this.handleSecondPassword}
                            margin="normal"
                        />                        
                    </form>
                </div>
                <div >
                    <Box display="flex" justifyContent="center" m={1} p={1}>
                    <Fab color="primary" aria-label="add" onClick={this.handleBack} className={useStyles.fab}>
                            <LeftIcon />
                        </Fab>  
                        <Fab color="primary" aria-label="add" onClick={this.handleNext} className={useStyles.fab1}>
                            <RightIcon />
                        </Fab>    
                    </Box>
                                            
                </div>
               </Container>
                
            </div>
        )
    }
}