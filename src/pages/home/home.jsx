import React from 'react';
import axios from 'axios';
import InventoriesComponent from '../../components/inventories/inventories';
import { TextField, Button, Box, FormControl, Select, MenuItem, InputLabel, CardActions } from '@mui/material';
import { Card, CardActionArea, CardContent, Divider, Typography } from '@mui/material';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: true,
            city: "",
            data: [],
            items: [],
            datafetched: false,
            selected: {},
            inventoryName: '',
            location: '',
            selectedInventory: [],
            itemsFetched: false,
            itemUpdate: {},
            itemUpdateNos: 0,
            itemsUpdateArray: [],
            inventoryIdSelected: "",
            destinationInventoryId: "",
            itemName: "",
            desc: "",
            itemNos: 0,
        }
    }

    componentDidMount() {
        axios.get("https://inventorymanager-shopify.herokuapp.com/inventories", this.state)
            .then(response => this.setState({data: response.data}, () => {
                console.log(this.state.data)
                console.log(this.state)
            }))
        axios.get("https://inventorymanager-shopify.herokuapp.com/items")
        .then(response => this.setState({items: response.data, datafetched: true}))
    }
    
    handleSubmit = async event => {
        axios.post("https://inventorymanager-shopify.herokuapp.com/inventories", this.state)
            .then(response => this.setState({data: response.data, datafetched: true}, () => {
                console.log(this.state.data)
                console.log(this.state)
            }))
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({ [name]: value })
    }

    handleSelect = (event) => {
        console.log(event)
        const {name, value} = event.target;
        this.setState({ [name]: value, inventoryName: value.inventoryName, location: value.location })
    }

    handleAdd = async event => {
        let data = {
            "inventoryName": this.state.inventoryName,
            "location": this.state.location
        }
        axios.post("https://inventorymanager-shopify.herokuapp.com/inventories", data)
        .then(response => console.log(response))
    }

    handleUpdate = async event => {
        let data = {
            "id": this.state.selected.id,
            "inventoryName": this.state.inventoryName,
            "location": this.state.location
        }
        axios.put("https://inventorymanager-shopify.herokuapp.com/inventories", data)
        .then(response => console.log(response))
    }

    handleDelete = async event => {
        axios.delete("https://inventorymanager-shopify.herokuapp.com/inventories/" + this.state.selected.id)
        .then(response => console.log(response))
    }

    handleGetInventory = async (event, inventory) => {
        axios.get("https://inventorymanager-shopify.herokuapp.com/inventories/" + inventory.id)
        .then(response => this.setState({selectedInventory: response.data, itemsFetched: true, view: false, inventoryIdSelected: inventory.id}, () => {
            console.log(this.state.data)
            console.log(this.state)
        }))
    }

    handleChangeItem = event => {
        const {name, value} = event.target;
        this.setState({ [name]: value })
    }

    handleSelectItem = event => {
        const {name, value} = event.target;
        this.setState({ [name]: value })
    }

    handleRemoveItemAddToList = event => {
        let data = this.state.itemsUpdateArray
        let itemToAdd = {
            itemName: this.state.itemUpdate.itemName,
            itemId: this.state.itemUpdate.id,
            nos: this.state.itemUpdateNos
        }
        data.push(itemToAdd)
        this.setState({itemsUpdateArray: data, itemUpdateNos: 0})
        console.log(this.state.itemsUpdateArray)
    }

    handleRemoveItems = async event => {
        axios.post("https://inventorymanager-shopify.herokuapp.com/inventories/" + this.state.inventoryIdSelected + "/remove", this.state.itemsUpdateArray)
        .then(response => this.setState({itemsUpdateArray: [], itemUpdate: {}}, () => {
            console.log(this.state.data)
            console.log(this.state)
        }))
    }

    handleAddItemsInventory = async event => {
        axios.post("https://inventorymanager-shopify.herokuapp.com/inventories/" + this.state.inventoryIdSelected + "/add", this.state.itemsUpdateArray)
        .then(response => this.setState({itemsUpdateArray: [], itemUpdate: {}}, () => {
            console.log(this.state.data)
            console.log(this.state)
        }))
    }

    handleShipItems = async event => {
        let data = {
            from: this.state.inventoryIdSelected,
            to: this.state.destinationInventoryId,
            items: this.state.itemsUpdateArray
        }
        console.log(data)
        axios.post("https://inventorymanager-shopify.herokuapp.com/shipment", data)
        .then(response => this.setState({itemsUpdateArray: [], itemUpdate: {}, destinationInventoryId: ""}, () => {
            console.log(this.state.data)
            console.log(this.state)
        }))
    }

    handleAddItem = async event => {
        let data = {
            itemName: this.state.itemName,
            desc: this.state.desc
        }
        axios.post("https://inventorymanager-shopify.herokuapp.com/items", data)
        .then(response => this.setState({itemName: "", desc: ""}))
    }

    handleUpdateItem = async event => {
        let data = {
            id: this.state.selected.id,
            itemName: this.state.itemName,
            desc: this.state.desc
        }
        axios.put("https://inventorymanager-shopify.herokuapp.com/items", data)
        .then(response => this.setState({itemName: "", desc: ""}))
    }

    handleDeleteItem = async event => {
        axios.delete("https://inventorymanager-shopify.herokuapp.com/items/" + this.state.selected.id)
        .then(response => this.setState({itemName: "", desc: ""}))
    }

    setView = event => {
        this.setState({view: true})
    }

    render() {
        return(
            <div>
                {   
                    this.state.view ? 
                    <div>
                        <h1>Please Select the Inventory</h1>
                        {
                            this.state.datafetched ?
                                this.state.data.map((inventory, index) => (
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardActionArea>
                                            <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {inventory.inventoryName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {inventory.location}
                                            </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button size="small" color="primary" onClick = {(e) => this.handleGetInventory(e, inventory)}>
                                            Open
                                            </Button>
                                        </CardActions>
                                    </Card>
                                )): <h1>Not fetched</h1>
                        }

                        <h1>Add Inventory</h1>
                        <TextField id="standard-basic" label="Inventory Name" variant="standard" onChange = {this.handleChange} value = {this.state.inventoryName} name = "inventoryName"/>
                        <TextField id="standard-basic" label="Inventory Location" variant="standard" onChange = {this.handleChange} value = {this.state.location} name = "location"/>
                        <Button variant="contained" onClick = {this.handleAdd}>Add</Button>
                        <h1>Update Inventory</h1>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Inventory</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.selected}
                                label="Inventory"
                                onChange={this.handleSelect}
                                name = "selected"

                                >
                                    {
                                        this.state.data.map((inventory, index) => (<MenuItem value = {inventory}>{inventory.inventoryName}</MenuItem>))
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <TextField id="standard-basic" label="Inventory Name" variant="standard" onChange = {this.handleChange} value = {this.state.inventoryName} name = "inventoryName"/>
                        <TextField id="standard-basic" label="Inventory Location" variant="standard" onChange = {this.handleChange} value = {this.state.location} name = "location"/>
                        <Button variant="contained" onClick = {this.handleUpdate}>Update</Button>
                        <h1>Delete Inventory</h1>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Inventory</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.selected}
                                label="Inventory"
                                onChange={this.handleSelect}
                                name = "selected"

                                >
                                    {
                                        this.state.data.map((inventory, index) => (<MenuItem value = {inventory}>{inventory.inventoryName}</MenuItem>))
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <Button variant="contained" onClick = {this.handleDelete}>Delete</Button>

                        <h1>Items List</h1>
                        {
                            this.state.datafetched ?
                                this.state.items.map((item, index) => (
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardActionArea>
                                            <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {item.itemName}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.desc}
                                            </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                )): <h1>Not fetched</h1>
                        }
                        <h1>Add Item</h1>
                        <TextField id="standard-basic" label="Item Name" variant="standard" onChange = {this.handleChange} value = {this.state.itemName} name = "itemName"/>
                        <TextField id="standard-basic" label="Description" variant="standard" onChange = {this.handleChange} value = {this.state.desc} name = "desc"/>
                        <Button variant="contained" onClick = {this.handleAddItem}>Add</Button>
                        <h1>Update Item</h1>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Inventory</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.selected}
                                label="Item"
                                onChange={this.handleSelect}
                                name = "selected"

                                >
                                    {
                                        this.state.items.map((item, index) => (<MenuItem value = {item}>{item.itemName}</MenuItem>))
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <TextField id="standard-basic" label="Item Name" variant="standard" onChange = {this.handleChange} value = {this.state.itemName} name = "itemName"/>
                        <TextField id="standard-basic" label="Item Description" variant="standard" onChange = {this.handleChange} value = {this.state.desc} name = "desc"/>
                        <Button variant="contained" onClick = {this.handleUpdateItem}>Update</Button>
                        <h1>Delete Item</h1>
                        <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Inventory</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.selected}
                                label="Item"
                                onChange={this.handleSelect}
                                name = "selected"

                                >
                                    {
                                        this.state.items.map((item, index) => (<MenuItem value = {item}>{item.itemName}</MenuItem>))
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <Button variant="contained" onClick = {this.handleDeleteItem}>Delete</Button>


                    </div> : 
                    <div>
                        <Button variant="contained" onClick = {this.setView}>Back</Button>
                        {
                            this.state.itemsFetched ?
                            <div> 
                                {
                                    this.state.selectedInventory.map((item, index) => (
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardActionArea>
                                                <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {item.item.itemName}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {item.item.desc}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Stock: {item.nos}
                                                </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>
                                            </CardActions>
                                        </Card>
                                    ))
                                }
                                <h1>Add Items</h1>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Item</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.itemUpdate}
                                        label="Item"
                                        onChange={this.handleChangeItem}
                                        name = "itemUpdate"

                                        >
                                            {
                                                this.state.items.map((item, index) => (<MenuItem value = {item}>{item.itemName}</MenuItem>))
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                                <TextField id="standard-basic" label="Nos to Remove" variant="standard" onChange = {this.handleChange} value = {this.state.itemUpdateNos} name = "itemUpdateNos"/>
                                <Button variant="contained" onClick = {this.handleRemoveItemAddToList}>Add to List</Button>
                                {
                                    this.state.itemsUpdateArray.map((item) => (<h1>{item.itemName} : {item.nos}</h1>))
                                }
                                <Button variant="contained" onClick = {this.handleAddItemsInventory}>Add Items</Button>
                                <h1>Remove Items</h1>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Item</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.itemUpdate}
                                        label="Item"
                                        onChange={this.handleChangeItem}
                                        name = "itemUpdate"

                                        >
                                            {
                                                this.state.selectedInventory.map((item, index) => (<MenuItem value = {item.item}>{item.item.itemName}</MenuItem>))
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                                <TextField id="standard-basic" label="Nos to Remove" variant="standard" onChange = {this.handleChange} value = {this.state.itemUpdateNos} name = "itemUpdateNos"/>
                                <Button variant="contained" onClick = {this.handleRemoveItemAddToList}>Add to List</Button>
                                {
                                    this.state.itemsUpdateArray.map((item) => (<h1>{item.itemName} : {item.nos}</h1>))
                                }
                                <Button variant="contained" onClick = {this.handleRemoveItems}>Remove Items</Button>

                                <h1>Create Shipment</h1>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Destination Inventory</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.destinationInventoryId}
                                        label="Item"
                                        onChange={this.handleChangeItem}
                                        name = "destinationInventoryId"

                                        >
                                            {
                                                this.state.data.map((inventory, index) => (<MenuItem value = {inventory.id}>{inventory.inventoryName}</MenuItem>))
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                                <h1>Shipment Items</h1>
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Item</InputLabel>
                                        <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.itemUpdate}
                                        label="Item"
                                        onChange={this.handleChangeItem}
                                        name = "itemUpdate"

                                        >
                                            {
                                                this.state.selectedInventory.map((item, index) => (<MenuItem value = {item.item}>{item.item.itemName}</MenuItem>))
                                            }
                                        </Select>
                                    </FormControl>
                                </Box>
                                <TextField id="standard-basic" label="Nos to Remove" variant="standard" onChange = {this.handleChange} value = {this.state.itemUpdateNos} name = "itemUpdateNos"/>
                                <Button variant="contained" onClick = {this.handleRemoveItemAddToList}>Add to List</Button>
                                {
                                    this.state.itemsUpdateArray.map((item) => (<h1>{item.itemName} : {item.nos}</h1>))
                                }
                                <Button variant="contained" onClick = {this.handleShipItems}>Ship Items</Button>
                            </div> :
                            <h1>Network Error</h1>
                        }
                    </div>
                }
            </div>
        );
    }

}
  
export default Home;
  