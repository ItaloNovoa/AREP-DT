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
import axios from 'axios';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';

export class edit extends Component {
    
    checkdata() {
        const email = document.getElementById("email").value;
        const name = document.getElementById("name").value+" "+document.getElementById("last_name").value;
        const password = document.getElementById("password").value
        if (email !== "" && password !== "") {
            fetch('https://taskplannerback.herokuapp.com/api/CUser/' + localStorage.getItem("mailLogged"))
                .then(response => response.json())
                .then(data => {
                    const newitem={
                        id: data.id,
                        email:email,
                        password: password,
                        name: name
                    }
                    axios.put(`https://taskplannerback.herokuapp.com/api/UUser`, newitem).then(response => {
                    localStorage.setItem("nameLogged",name);
                    localStorage.setItem("mailLogged", email);
                    localStorage.setItem("passwordLogged", password);
                    });
                });         
        }
    }

    constructor(props) {
        super(props);
        if (this.props.location.state) {
            this.state = {
                first_name: this.props.location.state.first_name, last_name: this.props.location.state.last_name,
                email: '', birthday: new Date('2014-08-18T21:11:54'), password: '', secondPassword: '', next: false, back: false,
            }

        } else {
            this.state = { first_name: '', last_name: '', email: '', birthday: new Date('2014-08-18T21:11:54'), password: '', secondPassword: '', next: false, back: false};
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

    render() {
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
                pathname: '/miniDrawer',
            }}
            />
        };

        return (
            <div >
                <h1  align="center">Editar informacion de Registro</h1>
               <Container>
               <div className='divStyle1'>
                    <form style={divStyle} >
                        <TextField
                            type="text"
                            label="New FIRST NAME"
                            id="name"
                            value={this.state.first_name}
                            onChange={this.handleFirstName}
                            margin="normal"
                        />
                        <TextField
                            type="text"
                            label="New LAST NAME"
                            id="last_name"
                            value={this.state.last_name}
                            onChange={this.handleLastName}
                            margin="normal"
                        />
                        <TextField
                            type="email"
                            label="New EMAIL ADDRESS"
                            id="email"
                            value={this.state.email}
                            onChange={this.handleEmail}
                            margin="normal"
                        />                        
                        <TextField
                            type="password"
                            label="New Password"
                            id="password"
                            value={this.state.password}
                            onChange={this.handlePassword}
                            margin="normal"
                        />
                        <TextField
                            type="password"
                            label="REPEAT New PASSWORD"
                            id="secondPassword"
                            value={this.state.secondPassword}
                            onChange={this.handleSecondPassword}
                            margin="normal"
                        />                        
                    </form>
                </div>
                <div >
                    <Box display="flex" justifyContent="center" m={1} p={1}>
                        <Fab tooltip="Cancelar" color="primary" aria-label="add" onClick={this.handleBack} className={useStyles.fab}>
                            <LeftIcon />
                        </Fab>  
                        <Fab tooltip="Confirmar" color="primary" aria-label="add" onClick={this.handleNext} className={useStyles.fab1}>
                            <RightIcon />
                        </Fab>    
                    </Box>
                                            
                </div>
               </Container>
                
            </div>
        )
    }
}