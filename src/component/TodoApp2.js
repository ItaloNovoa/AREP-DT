import React from 'react';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

export class TodoApp2 extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div >
                <p></p>
                <p></p>
                <Card style={{flex:1, backgroundColor:'#92a8d1'}} >
                <Typography color="textSecondary" gutterBottom>
                        Cedula= {this.props.res.id} {"                  -          ".replace(/ /g, "\u00a0")} Nombre= {this.props.res.nombre}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        Empresa= {this.props.res.compañia}{"                  -          ".replace(/ /g, "\u00a0")} puntuacion= {this.props.res.puntuacion}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        Descripcion= {this.props.res.description}
                    </Typography>
                    
                    <Typography color="textSecondary" gutterBottom>
                        DueDate = {this.props.res.dueDate.toString()}
                    </Typography>
                </Card>
                <p></p>
                <p></p>
            </div>
        );
    }
}