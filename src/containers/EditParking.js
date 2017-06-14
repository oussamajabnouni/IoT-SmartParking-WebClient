import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Dropzone from 'react-dropzone'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {grey400,green400,green100,green300} from 'material-ui/styles/colors';
import agent from '../agent';
import globalStyles from '../styles';
import Cards from 'react-credit-cards';
import Dialog from 'material-ui/Dialog';
import './styles.css';
import Map from './AddParking/map';
import Device from './AddParking/device';
import Upload from './AddParking/upload';

class EditParking extends React.Component {
    constructor(props){
    super(props)
    this.state = {
        title: '',
        description: '',
        reserved: '',
        capacity: '',
        location: '',
        hourprice:'',
        dayprice:'',
        deviceid:'',
        imageurl:'',
        amenities: {},
        owner: {}
    }

    this.updateState = field => ev => {
    const state = this.state;
    const newState = Object.assign({}, state, { [field]: ev.target.value });
    this.setState(newState);
    };
    this.handlePosition = (location)=>{
    this.setState({location})
    }
    this.submitForm = ev => {
         ev.preventDefault();
         agent.Parkings.update(this.props.params.id,this.state).then(data =>{
            window.location.reload() 
         })    
    }
    
  }
    onDrop(files) {
        agent.Parkings.upload(files[0]).then(Data=>{
            this.setState({imageurl:Data.url})
            this.props.handleImage(this.state.url)
        })
    }
  componentDidMount() {
   agent.Parkings.getOne(this.props.params.id).then(data =>{
      this.setState({
        title: data.title,
        description: data.description,
        reserved: data.reserved,
        capacity: data.capacity,
        location: data.location,
        hourprice:data.hourprice,
        dayprice:data.dayprice,
        deviceid:data.deviceid,
        imageurl:data.imageurl,
        amenities: data.amenities,
        owner: data.imageurl
      })}
    )

  }
    render() {
        const styles = {
        toggleDiv: {maxWidth: 300,marginTop: 40,marginBottom: 5},
        toggleLabel: {color: grey400,fontWeight: 100},
        buttons: {marginTop: 40},
        saveButton: {marginLeft: 5},
        withdraw: {margin:'0 auto',display:'table',marginTop: 40},
        paper: {padding: 30 },
        msg: {textAlign:'center'},
        refersh: {position: 'relative',margin:90},
        image: {
            marginTop: 25,
            width: '100%',
            height: '40%',
            objectFit: 'cover'
        },
        
       };
        const overlayStyle = {
        marginTop: 25,
        borderStyle: 'none'
        };
        const map = this.state.location
                    ?
                    <Map handlePosition={this.handlePosition} 
                    position={this.state.location}
                    />
                    :
                    <RefreshIndicator
                    size={50}
                    left={70}
                    top={0}
                    loadingColor="#FF9800"
                    status="loading"
                    style={styles.refresh}
                    /> 
        return (
        <div>
            <span style={globalStyles.navigation}>Application / Edit parking</span>
            <div className="row">
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                <Paper style={styles.paper}>
                    <form onSubmit={this.submitForm}>
                        <TextField
                        floatingLabelText="Title"
                        fullWidth={true}
                        value={this.state.title}
                        onChange={this.updateState('title')}
                        />
                        <TextField
                        floatingLabelText="Description"
                        fullWidth={true}
                        multiLine={true}
                        rows={3}         
                        value={this.state.description}
                        onChange={this.updateState('description')}
                        />

                        <TextField
                        floatingLabelText="Parking capacity"
                        fullWidth={true}
                        value={this.state.capacity}
                        onChange={this.updateState('capacity')}
                        />
                        <TextField
                        floatingLabelText="Parking price for 1 hour in Tunisian Dinar"
                        fullWidth={true}
                        value={this.state.hourprice}
                        onChange={this.updateState('hourprice')}
                        />
                        <div style={styles.buttons}>
                        <RaisedButton label="Save changes"
                                        disabled={this.state.inProgress}
                                        style={styles.saveButton}
                                        type="submit"
                                        primary={true}/>
                        </div>
                    </form>
                <div style={globalStyles.clear}/>
                </Paper>
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                {map}
                <img src={this.state.imageurl} style={styles.image} />
                <Dropzone
                    style={overlayStyle}
                    onDrop={this.onDrop.bind(this)}
                >
                <RaisedButton label="Upload new image"
                primary={true}
                />
                </Dropzone>
            </div>
            </div>
            
        </div>
        );
    }
}

export default EditParking;