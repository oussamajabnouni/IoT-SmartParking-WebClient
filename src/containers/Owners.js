import React from 'react';
import agent from '../agent';
import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Delete from 'material-ui/svg-icons/action/delete';
import {pink500, grey200, grey500} from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';
import RefreshIndicator from 'material-ui/RefreshIndicator';

class Owners extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      Data: [],
    }
  }
  componentWillMount() {
    agent.Auth.getAll().then(data =>
      this.setState({
        Data:data
      })
    )
  }

  render() {
    const styles = {
      floatingActionButton: {
        margin: 0,
        top: 'auto',
        right: 80,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
      },
      floatingDeleteButton: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
      },
      editButton: {
        fill: grey500
      },
      refresh: {
        display: 'inline-block',
        position: 'relative',
        marginTop: 50,
        marginBottom:50,
        marginLeft: '40%'
      },
      columns: {
        id: {
          width: '40%'
        },
        name: {
          width: '20%'
        },
        price: {
          width: '20%'
        },
        edit: {
          width: '10%'
        }
      }
    };
    return (
      <PageBase title="Parking owners"
                navigation="Application / Parking owners">

        <div>
          <Link to="/addowner" >
            <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>

          <FloatingActionButton style={styles.floatingDeleteButton} backgroundColor={pink500}>
            <Delete />
          </FloatingActionButton>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn style={styles.columns.id}>Email</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.name}>Account balance</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.price}>Share</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.price}>Created At</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            { (this.state.Data.length > 0) &&
            <TableBody>{
              this.state.Data.map(item =>
                <TableRow key={item._id}>
                  <TableRowColumn style={styles.columns.id}>{item.email}</TableRowColumn>
                  <TableRowColumn style={styles.columns.name}>{item.balance} TD</TableRowColumn>
                  <TableRowColumn style={styles.columns.price}>{item.share}</TableRowColumn>
                  <TableRowColumn style={styles.columns.price}>{item.createdAt.substring(0, 10)}</TableRowColumn>

                </TableRow>
              )}
            </TableBody>
            }
          </Table>   
            {(this.state.Data.length <= 0) &&    
            <RefreshIndicator
            size={50}
            left={70}
            top={0}
            loadingColor="#FF9800"
            status="loading"
            style={styles.refresh}
            /> }
        </div>
      </PageBase>
    );
  }
}

export default Owners;
