import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import './Login.css'
import { Redirect } from "react-router-dom";
import image1 from "./imagenes/logo.png";
import axios from 'axios';

export class Login extends React.Component {

    checkdata() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const newItem = {
            email : email,
            password : password
        }
        axios.post('https://taskplannerback.herokuapp.com/api/login', newItem)
            .then(function (response) {
                localStorage.setItem("Token", response.data.accessToken);
                localStorage.setItem("isLoggedin", true);
                localStorage.setItem("mailLogged", email);

                window.location.replace("/miniDrawer");   
            })
            .catch(function (error) {
                alert("usuario o correo incorrecto");
            })       
        
        this.axios = axios.create({
            baseURL: 'https://taskplannerback.herokuapp.com/api',
            timeout: 1000,
            headers: {'Authorization': 'Bearer '+localStorage.getItem("Token")}
        });

    }
    constructor(props) {
        super(props);
        this.state = { createAcount: '', funciona: false }
        this.handleLoggin = this.handleLoggin.bind(this);
        this.handleCreateAcount = this.handleCreateAcount.bind(this);
    }
    handleLoggin(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        if (email !=="" && password!==""){
            this.checkdata();
        }else{
            alert("El campo de email o contraseña esta vacio");
        }    
        
    }

    handleCreateAcount() {
        this.setState({ createAcount: true });
    }
    log() {
        if (localStorage.isLoggedin === "true") {
            window.location.replace("/miniDrawer");
        }
    }
    render() {
        this.log();
        if (this.state.createAcount) {
            return <Redirect to={{
                pathname: '/name'
            }}
            />
        }
        return (
            <React.Fragment>
                <CssBaseline />
                <main className="layout">

                    <Paper className="paper">
                        <img src={image1} />
                        
                        <form className="form">
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input id="email" name="email" autoComplete="email" autoFocus />
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                variant="raised"
                                color="primary"
                                className="submit"
                                onClick={this.handleLoggin}
                            >
                                Sign in
                            </Button>
                            <Button
                                className="ButtonLindo"
                                type="submit"
                                variant="raised"
                                color="primary"
                                className="submit"
                                onClick={this.handleCreateAcount}
                            >
                                Create Account
                            </Button>
                        </form>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }

}
