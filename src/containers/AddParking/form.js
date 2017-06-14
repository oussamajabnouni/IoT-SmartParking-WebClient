import React, { Component } from 'react';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';

class Form extends Component {

    constructor(props) {
        super(props);
        this.state = {chipData: [
        {key: 0, label: 'CCTV Cameras'},
        {key: 1, label: 'Single Space'},
        {key: 2, label: 'Outdoor Lot'},
        {key: 3, label: 'Valet Parking'},
        {key: 4, label: 'Ev charger'},
        ],}
        
        this.styles = {
        chip: {
            margin: 4,
        },
        wrapper: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        }

    }

    handleRequestDelete = (key) => {
        this.chipData = this.state.chipData;
        const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
        this.chipData.splice(chipToDelete, 1);
        this.setState({chipData: this.chipData});
        this.props.handleChip(this.state.chipData)
    };

    renderChip(data) {
        return (
        <Chip
            key={data.key}
            onRequestDelete={() => this.handleRequestDelete(data.key)}
            style={this.styles.chip}
        >
            {data.label}
        </Chip>
        );
    }

    render() {
        return (
        <div style={this.styles.wrapper}>
        <form>
            <TextField
            hintText="Title"
            fullWidth={true}
            value={this.props.info.title}
            onChange={this.props.handleTitle}
            />
           <TextField
            hintText="Capacity"
            fullWidth={true}
            value={this.props.info.capacity}
            onChange={this.props.handleCapacity}
            />
           <TextField
            hintText="Price for one hour in Tunisian Dinar"
            fullWidth={true}
            value={this.props.info.hourprice}
            onChange={this.props.handleHourprice}
            />
            <TextField
            hintText="Price for 24 hour in Tunisian Dinar"
            fullWidth={true}
            value={this.props.info.dayprice}
            onChange={this.props.handleDayprice}
            />
            <TextField
            hintText="Description"
            multiLine={true}
            fullWidth={true}
            rows={2}
            rowsMax={4}
            value={this.props.info.description}
            onChange={this.props.handleDescription}
            />

        </form><br />
            {this.state.chipData.map(this.renderChip, this)}
        </div>
        );
    }
}

export default Form;