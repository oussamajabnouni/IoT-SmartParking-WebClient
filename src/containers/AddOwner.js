import React from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {grey400,green400,green100,green300} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import PageBase from '../components/PageBase';
import agent from '../agent';

class AddOwner extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      email : '',
      success : false,
      msgError : ''
    } 
    this.onSubmit = ev => {
      ev.preventDefault();
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let regex = new RegExp(re);
      if (this.state.email&&regex.test(this.state.email)){
        agent.Auth.register(this.state.email,this.state.share).then(response=>{
            this.setState({success: true})
        }).catch(error=> this.setState({msgError: 'Email already taken'}) )
      }else{this.setState({msgError: 'Email is invalid or empty'})}
    }
    this.handleChange = ev => {
      this.setState({
        email: ev.target.value
      });     
    }
    this.handleShare = ev => {
      this.setState({
        share: ev.target.value
      });     
    }
    this.handleClose = () => {
      this.props.history.push('/owners')
    };
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
    return(
    <PageBase title="Add parking owner"
              navigation="Application / Add parking owner">
      <form>

        <TextField
          hintText="Email"
          floatingLabelText="Email"
          fullWidth={true}
          disabled={this.s}
          errorStyle={styles.errortxt}
          errorText={this.state.msgError}
          value={this.state.email}
          onChange={this.handleChange}
        />
        <TextField
          hintText="Share"
          floatingLabelText="Share"
          fullWidth={true}
          disabled={this.s}
          errorStyle={styles.errortxt}
          errorText={this.state.msgError}
          value={this.state.share}
          onChange={this.handleShare}
        />
        <div style={styles.buttons}>
          <Link to="/owners">
            <RaisedButton label="Cancel"/>
          </Link>
          <RaisedButton label="Add"
                        style={styles.saveButton}
                        onTouchTap={this.onSubmit}
                        primary={true}/>
        </div>
      </form>
        <Dialog
          title="Service provider added successfully"
          actions={actions}
          modal={false}
          titleStyle={styles.msg}
          actionsContainerStyle={styles.msg}
          bodyStyle={styles.msg}
          open={this.state.success}
        >
          password sent to {this.state.email}
        </Dialog>
    </PageBase>
  )};
};

export default AddOwner;
