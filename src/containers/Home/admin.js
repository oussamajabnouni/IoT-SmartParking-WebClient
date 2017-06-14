import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import {cyan600, pink600, purple600, orange600} from 'material-ui/styles/colors';
import Assessment from 'material-ui/svg-icons/action/assessment';
import io from 'socket.io-client'
const socket = io('https://pacific-everglades-71526.herokuapp.com/');
import Face from 'material-ui/svg-icons/action/face';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import Today from 'material-ui/svg-icons/action/today';
import TimeLine from 'material-ui/svg-icons/action/timeline';
import CreditCard from 'material-ui/svg-icons/action/credit-card';
import AttachMoney from 'material-ui/svg-icons/editor/attach-money';
import InfoBox from './InfoBox';
import Prices from './prices';
import PerDay from './perDay';
import ParkingUsage from './parkingUsage';
import HistoryList from './historyList';
import globalStyles from '../../styles';
const groupArray = require('group-array');

const Promise = global.Promise;

const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
  currentUser: state.common.currentUser,

});

class Admin extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      Data: [],
      total: 0,
      parkings: [],
      balance: 0,
      daily:[]
    }
  } 
  datachange  (){
      const isBigEnough = (value) => {
        return value.parking.owner=== this.props.currentUser._id;
      }
      agent.Auth.getAll().then(data=>{
        this.setState({
            Data: data,
            total: data.length,
            parkings: groupArray(data,'parking._id'),
            daily: groupArray(data,'createdAt'),
        })
      }).catch(error=>console.error(error))
      agent.Auth.current().then(data=>{
        console.log(data)
        this.setState({
            balance: data.admin.balance
        })
      }).catch(error=>console.error(error))

    }
  componentDidMount() {
    this.datachange()
    socket.on('update', function(){this.datachange()});
  }

  render() {
    return (
      <div>
          <h3 style={globalStyles.navigation}>Application / Dashboard</h3>

          <div className="row">

            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
              <InfoBox Icon={CreditCard}
                      color={pink600}
                      title="Account balance"
                      value={this.state.balance+" DT"}
              />
            </div>

            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
              <InfoBox Icon={AttachMoney}
                      color={orange600}
                      title="Today profit"
                      value={this.state.balance+" DT"}
              />
            </div>

            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
              <InfoBox Icon={TimeLine}
                      color={cyan600}
                      title="Total parking owners"
                      value={this.state.total}
              />
            </div>

            <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
              <InfoBox Icon={Today}
                      color={purple600}
                      title="Today Reservations"
                      value={this.state.total}
              />
            </div>

          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
              <Prices data={ [
                  {name: 'Page A', uv: 4000, pv: 9000, amt: 2400},
                  {name: 'Page B', uv: 3000, pv: 9020, amt: 2210},
                  {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
                  {name: 'Page D', uv: 2780, pv: 9100, amt: 2000},
                  {name: 'Page E', uv: 1890, pv: 8888, amt: 2181},
                  {name: 'Page F', uv: 2390, pv: 7777, amt: 2500},
                  {name: 'Page G', uv: 3490, pv: 1111, amt: 2100},
              ]}/>
            </div>

            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15">
              <PerDay  data={ [
                  {name: 'Jan', uv: 4000, pv: 2400, amt: 2400},
                  {name: 'Feb', uv: 3000, pv: 2400, amt: 2210},
                  {name: 'March', uv: 2000, pv: 2400, amt: 2290},
                  {name: 'April', uv: 2780, pv: 2400, amt: 2000},
                  {name: 'May', uv: 1890, pv: 2400, amt: 2181},
                  {name: 'June', uv: 2390, pv: 2400, amt: 2500},
                  {name: 'July', uv: 3490, pv: 2400, amt: 2100},
              ]}/>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 m-b-15 ">
              <HistoryList isadmin={true} data={this.state.Data}/>
            </div>
          </div>
        </div>
    );
  }
}

export default connect(mapStateToProps)(Admin);
