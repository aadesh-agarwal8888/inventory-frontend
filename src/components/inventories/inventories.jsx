import React from 'react'
import InventoryPanel from '../inventory-panel/inventory-panel.components';
class InventoriesComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inventories: this.props.inventories,
        };
    }

    componentWillReceiveProps(new_props) {
        this.setState({forecast: new_props.forecast})
    }

    componentDidUpdate() {

    }

    handleClick(rowNumber){
        console.log(rowNumber)
    }

    render() {
        return(
            <div>
                {this.state.inventories.map((inventory, index) => (<InventoryPanel key = {index} inventory = {inventory}/>))}
            </div>
        );

    }

}

export default InventoriesComponent