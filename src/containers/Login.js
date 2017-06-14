import ListErrors from './../components/ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import {grey500, white} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: 'UPDATE_FIELD_AUTH', key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: 'LOGIN', payload: agent.Auth.login(email, password) }),
  onUnload: () =>
    dispatch({ type: 'LOGIN_PAGE_UNLOADED' })
});

class Login extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }
  render() {
      const styles = {
        loginContainer: {
          minWidth: 320,
          maxWidth: 400,
          height: 'auto',
          position: 'absolute',
          top: '20%',
          left: 0,
          right: 0,
          margin: 'auto'
        },
        paper: {
          padding: 20,
          overflow: 'auto',
          marginTop: '142px'
        },
        buttonsDiv: {
          textAlign: 'center',
          padding: 10
        },
        flatButton: {
          color: grey500
        },
        checkRemember: {
          style: {
            float: 'left',
            maxWidth: 180,
            paddingTop: 5
          },
          labelStyle: {
            color: grey500
          },
          iconStyle: {
            color: grey500,
            borderColor: grey500,
            fill: grey500
          }
        },
        loginBtn: {
          float: 'right'
        },
        btn: {
          background: '#4f81e9',
          color: white,
          padding: 7,
          borderRadius: 2,
          margin: 2,
          fontSize: 13
        },
        btnFacebook: {
          background: '#4f81e9'
        },
        btnGoogle: {
          background: '#e14441'
        },
        btnSpan: {
          marginLeft: 5
        },
        icon:{
           width: '100px',
          position: 'absolute',
          left: '0px',
          right: '0px',
          margin: 'auto'
        },
        mac:{
           width: '180px',
           margin: "50px 10px 10px 10px"
        }
      };
    const email = this.props.email;
    const password = this.props.password;
    return (
        <div style={styles.loginContainer}>
          <img src="/icon.png" style={styles.icon} />
          <Paper style={styles.paper}>
              <ListErrors errors={this.props.errors} />
            <form onSubmit={this.submitForm(email, password)}>
              <TextField
                hintText="E-mail"
                floatingLabelText="E-mail"
                fullWidth={true}
                value={email}
                onChange={this.changeEmail}
                autoComplete="on"
              />
              <TextField
                hintText="Password"
                floatingLabelText="Password"
                fullWidth={true}
                type="password"
                value={password}
                onChange={this.changePassword} 
              />
              <div>      
              <Checkbox
                label="Remember me"
                style={styles.checkRemember.style}
                labelStyle={styles.checkRemember.labelStyle}
                iconStyle={styles.checkRemember.iconStyle}
              />
              <RaisedButton 
                label="Login"
                type="submit"
                primary={true}
                disabled={this.props.inProgress}
                style={styles.loginBtn}
              />
              </div>
            </form>
          </Paper>
          <img src="/mac.png" style={styles.mac} />
          <img src="/windows.png" style={styles.mac} />
        </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
