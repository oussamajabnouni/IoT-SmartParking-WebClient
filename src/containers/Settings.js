import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {grey400,green400,green100,green300} from 'material-ui/styles/colors';
import agent from '../agent';
import { connect } from 'react-redux';
import globalStyles from '../styles';
import Cards from 'react-credit-cards';
import Dialog from 'material-ui/Dialog';
import './styles.css';


const mapStateToProps = state => ({
  ...state.settings,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onClickLogout: () => dispatch({ type: 'LOGOUT' }),
  onSubmitForm: user =>
    dispatch({ type: 'SETTINGS_SAVED', payload: agent.Auth.save(user) }),
  onUnload: () => dispatch({ type: 'SETTINGS_PAGE_UNLOADED' })
});

class Settings extends React.Component {
  constructor() {
      super();

      this.state = {
        username: '',
        email: '',
        balance: '',
        password: '',
        number: '',
        name: '',
        expiry: '',
        cvc: '',
        focused: '',
        success: false
      };

      this.updateState = field => ev => {
        const state = this.state;
        const newState = Object.assign({}, state, { [field]: ev.target.value });
        this.setState(newState);
      };

      this.submitForm = ev => {
        ev.preventDefault();
        const creditcard = {
            number: this.state.number,
            name: this.state.name,
            expiry: this.state.expiry,
            cvc: this.state.cvc,
        }
        const user = {
            email: this.state.email,
            password: this.state.password,
            creditcard
        };
        if (!user.password) {
          delete user.password;
        }

        this.props.onSubmitForm(user);
      };

        this.handleInputFocus = (e) => {
          const target = e.target;

          this.setState({
            focused: target.name,
          });
        };

        this.handleInputChange = (e) => {
          const target = e.target;

          if (target.name === 'number') {
            this.setState({
              [target.name]: target.value.replace(/ /g, ''),
            });
          }
          else if (target.name === 'expiry') {
            this.setState({
              [target.name]: target.value.replace(/ |\//g, ''),
            });
          }
          else {
            this.setState({
              [target.name]: target.value,
            });
          }
        };

        this.handleCallback = (type, isValid) =>{
          console.log(type, isValid); //eslint-disable-line no-console
        }

        this.onWithdraw = () =>{
          agent.Auth.withdraw().then(()=>{
            this.setState({success:true})
          })
        }

        this.handleClose = () => {
          this.props.history.push('/')
        };
    }

    componentWillMount() {
      if (this.props.currentUser) {
        Object.assign(this.state, {
          username: this.props.currentUser.username,
          email: this.props.currentUser.email,
          balance: this.props.currentUser.balance,
          number: this.props.currentUser.creditcard.number,
          name: this.props.currentUser.creditcard.name,
          expiry: this.props.currentUser.creditcard.expiry,
          cvc: this.props.currentUser.creditcard.cvc,
        });
      }
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.currentUser) {
        this.setState(Object.assign({}, this.state, {
          username: nextProps.currentUser.username,
          email: nextProps.currentUser.email
        }));
      }
    }
    

  render() {
    const { name, number, expiry, cvc, focused } = this.state;
    const actions = [
      <FlatButton
        label="Discard"
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />];
    const styles = {
      toggleDiv: {maxWidth: 300,marginTop: 40,marginBottom: 5},
      toggleLabel: {color: grey400,fontWeight: 100},
      buttons: {marginTop: 40},
      card: {marginTop: 120},
      saveButton: {marginLeft: 5},
      withdraw: {margin:'0 auto',display:'table',marginTop: 40},
      paper: {padding: 30 },
      msg: {textAlign:'center'}
    };
    return (
      <div>
        <span style={globalStyles.navigation}>Application / Settings</span>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
              <Paper style={styles.paper}>
                <h3 style={globalStyles.title}>Settings</h3>
                <Divider/>
                  <form onSubmit={this.submitForm}>
                    <TextField
                      hintText="Email"
                      floatingLabelText="Email"
                      fullWidth={true}
                      value={this.state.email}
                      onChange={this.updateState('email')}

                    />
                    <TextField
                      hintText="New Password"
                      fullWidth={true}
                      type="password"
                      value={this.state.password}
                      onChange={this.updateState('password')}
                    />
                    <TextField
                      type="tel"
                      name="number"
                      hintText="Card Number"
                      fullWidth={true}
                      value={this.state.number}
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                    />
                    <TextField
                      type="text"
                      name="name"
                      hintText="Name"
                      fullWidth={true}
                      value={this.state.name}
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                    />
                    <TextField
                      type="tel"
                      name="expiry"
                      hintText="Valid Thru"
                      fullWidth={true}
                      value={this.state.expiry}
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
                    />
                    <TextField
                      type="tel"
                      name="cvc"
                      hintText="CVC"
                      fullWidth={true}
                      value={this.state.cvc}
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
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
                    <div style={styles.card}>
                      <Cards
                        number={number}
                        name={name}
                        expiry={expiry}
                        cvc={cvc}
                        focused={focused}
                        callback={this.handleCallback}
                      />
                      {this.props.currentUser.creditcard&&
                      <RaisedButton label="Withdraw account balance"
                                    style={styles.withdraw}
                                    type="submit"
                                    onTouchTap={this.onWithdraw}
                                    primary={true}/>
                      }
                    </div>

            </div>
          </div>
          <Dialog
            title="The money has been transferred to your credit card successfully"
            actions={actions}
            modal={false}
            titleStyle={styles.msg}
            actionsContainerStyle={styles.msg}
            bodyStyle={styles.msg}
            open={this.state.success}
          >
            {this.state.balance} Tunisian Dinar
          </Dialog>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
