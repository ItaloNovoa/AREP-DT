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
                        Descripcion= {this.props.res.description}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        Nombre= {this.props.res.propietario.name} {"                  -          ".replace(/ /g, "\u00a0")} priority= {this.props.res.priority}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        Estado = {this.props.res.status}  {"           -          ".replace(/ /g, "\u00a0")}    DueDate = {this.props.res.dueDate.toString()}
                    </Typography>
                </Card>
                <p></p>
                <p></p>
            </div>
        );
    }
}