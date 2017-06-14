import React from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {grey400,green400,green100,green300} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import Done from 'material-ui/svg-icons/action/done';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import PageBase from '../../components/PageBase';
import Map from './map';
import Device from './device';
import Upload from './upload';
import Form from './form';
import agent from '../../agent';

class AddParking extends React.Component {
 
  constructor(props) {
      super(props);
      this.state = {
        success : false,
        msgError : '',
        loading: false,
        finished: false,
        stepIndex: 0,
        deviceid:'',
        location:{},
        imageurl: '',
        title:'',
        capacity:'',
        hourprice:'',
        dayprice:'',
        description:'',
        amenities:[],
      } 

      this.handleChange = ev => {
        this.setState({
          email: ev.target.value
        });     
      }
      this.handleClose = () => {
        this.props.history.push('/parkings')
      };

      this.dummyAsync = (cb) => {
        this.setState({loading: true}, () => {
          this.asyncTimer = setTimeout(cb, 500);
        });
      };

      this.handleNext = () => {
        const {stepIndex,title,deviceid,location,imageurl,capacity,hourprice,dayprice,description,amenities} = this.state;
        if (!this.state.loading) {
          this.dummyAsync(() => this.setState({
            loading: false,
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 3,
          }));
        }
        if(stepIndex >= 3){
          agent.Parkings.add({title,deviceid,location,imageurl,capacity,hourprice,dayprice,description,amenities})
          .then(res=>console.log(res))
          .catch(error=> this.setState({msgError: 'Email already taken'}) )
        }
      };

      this.handlePrev = () => {
        const {stepIndex} = this.state;
        if (!this.state.loading) {
          this.dummyAsync(() => this.setState({
            loading: false,
            stepIndex: stepIndex - 1,
          }));
        }
      };

      this.handlePosition = (location)=>{
        this.setState({location})
      }
      this.handleDevice = (device)=>{
        this.setState({deviceid: device})
      }

      this.handleImage = (image)=>{
        this.setState({imageurl:image})
      }

      this.handleTitle = (e)=>{
        this.setState({title: e.target.value})
      }
      this.handleCapacity = (e)=>{
        this.setState({capacity: e.target.value})
      }
      this.handleHourprice = (e)=>{
        this.setState({hourprice: e.target.value})
      }
      this.handleDayprice = (e)=>{
        this.setState({dayprice: e.target.value})
      }
      this.handleDescription = (e)=>{
        this.setState({description: e.target.value})
      }
      this.handleChip = (e)=>{
        this.setState({amenities: e})
      }
      
      this.getStepContent =(stepIndex)=> {
        switch (stepIndex) {
          case 0:
            return (
             <Device handleDevice={this.handleDevice}/>
            );
          case 1:
            return (
              <Map position={null} handlePosition={this.handlePosition}/>
            );
          case 2:
            return (
              <Upload handleImage={this.handleImage}/>
            );
          case 3:
            return (
              <Form info={this.state} 
              handleTitle={this.handleTitle}
              handleCapacity={this.handleCapacity}
              handleHourprice={this.handleHourprice}
              handleDayprice={this.handleDayprice}
              handleDescription={this.handleDescription}
              handleChip={this.handleChip}
              />
            );
          default:
            return 'You\'re a long way from home sonny jim!';
        }
      }


  }

   renderContent() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px', overflow: 'hidden',
    textAlign:'center'};
    const finish = {margin: '40px', overflow: 'hidden',fontSize:27,
    textAlign:'center',color:green400};
    const icon = {height:100,width:100,
    textAlign:'center',color:green400};

    if (finished) {
      return (
        <div style={finish}>
          <Done style={icon}/>
          <p>
            Your parking information has been submitted successfully
          </p>
        </div>
      );
    }

    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
        <div style={{marginTop: 24, marginBottom: 12}}>
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            onTouchTap={this.handlePrev}
            style={{marginRight: 12}}
          />
          <RaisedButton
            label={stepIndex === 3 ? 'Add parking' : 'Next'}
            primary={true}
            onTouchTap={this.handleNext}
          />
        </div>
      </div>
    );
  }

  render() {
    const styles = {
      toggleDiv: {
        maxWidth: 300,
        marginTop: 40,
        marginBottom: 5
      },
      toggleLabel: {
        color: grey400,
        fontWeight: 100
      },
      buttons: {
        marginTop: 30,
        float: 'right'
      },
      saveButton: {
        marginLeft: 5
      },
      errortxt: {
        fontSize:15
      },
      msg: {
          width: '100%',
        backgroundColor:green400,
        color: 'white'
      }
    };
    const actions = [
      <FlatButton
        label="Discard"
        backgroundColor={green100}
        hoverColor={green300}
        primary={true}
        style={{color:'white'}}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />];
    const {loading, stepIndex} = this.state;
    return(
    <PageBase title="Add parking "
              navigation="Application / Add parking ">
        <div>      
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Find device</StepLabel>
            </Step>
            <Step>
              <StepLabel>Choose location</StepLabel>
            </Step>
            <Step>
              <StepLabel>Image upload</StepLabel>
            </Step>
            <Step>
              <StepLabel>Complete information</StepLabel>
            </Step>
          </Stepper>
          <ExpandTransition loading={loading} open={true}>
            {this.renderContent()}
          </ExpandTransition>
        </div> 
    </PageBase>
  )};
};

export default AddParking;
