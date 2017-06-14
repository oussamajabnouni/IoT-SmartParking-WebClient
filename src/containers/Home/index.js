import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import Admin from './admin'
import Owner from './owner'

const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
  currentUser: state.common.currentUser,

});


class Home extends React.Component {
  constructor(props){
    super(props)
  }

  render() {
    if(this.props.currentUser){
      if(this.props.currentUser.isadmin){
          return <Admin />
        }
    }
    return (
     <Owner />
    );
  }
}

export default connect(mapStateToProps)(Home);
