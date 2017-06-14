import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class Device extends Component {
   constructor(props) {
        super(props);
        this.state = {
        id : ''
        } 
        this.handeChange = this.handeChange.bind(this);
    }
    handeChange = (e) =>{
        this.setState({
            id: e.target.value
        })
        this.props.handleDevice(e.target.value)
    }
    render() {
        return (
            <div>
                <TextField
                hintText="Parking system id"
                floatingLabelText="Parking system id"
                fullWidth={true}
                value={this.state.id}
                onChange={this.handeChange}
                />
            </div>
        );
    }
}

export default Device;