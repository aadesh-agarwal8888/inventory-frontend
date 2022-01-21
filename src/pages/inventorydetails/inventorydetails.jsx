import React from 'react';
import axios from 'axios';
import InventoriesComponent from '../../components/inventories/inventories';

class InventoryDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: {},
            datafetched: false
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8080/inventories/"+this.state.inventory.id, this.state)
            .then(response => this.setState({data: response.data, datafetched: true}, () => {
                console.log(this.state.data)
                console.log(this.state)
            }))
    }
    
    handleSubmit = async event => {
        axios.post("localhost:8080/inventories", this.state)
            .then(response => this.setState({data: response.data, datafetched: true}, () => {
                console.log(this.state.data)
                console.log(this.state)
            }))
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({ [name]: value })
    }

    render() {
        return(
            <div style = {{justifyContent: 'center', alignContent: 'center'}}>
                <h1>Inventory</h1>
            </div>
        );
    }

}
  
export default InventoryDetails;
  