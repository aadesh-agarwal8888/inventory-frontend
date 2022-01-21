import { Card, CardActionArea, CardContent, Divider, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

class InventoryPanel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inventory: this.props.inventory
        }
    }
    componentWillReceiveProps(new_props) {
        this.setState({details: new_props.details})
    }

    handleClick(value){
        console.log(value)
    }

    render() {
        return(
            <div>
                <Card sx={{ maxWidth: 345 }} onClick = {this.handleClick(this.state.inventory)}>
                    <CardActionArea>
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {this.state.inventory.inventoryName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {this.state.inventory.location}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>
        );
    }

}

export default InventoryPanel;