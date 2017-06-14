import React from 'react';
import agent from '../agent';
import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey200, grey500} from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';
import RefreshIndicator from 'material-ui/RefreshIndicator';



class Myparkings extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      Data: []
    }
  }
  componentWillMount() {
   agent.Parkings.byOwner().then(data =>
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
        title: {
          width: '10%'
        },
        owner: {
          width: '20%'
        },
        location: {
          width: '20%'
        },
        capacity: {
          width: '20%'
        },
        createdAt: {
          width: '20%'
        },
        edit: {
          width: '10%'
        }
      }
    };
    if (this.state.data !== [])
    return (
      <PageBase title="Parkings"
                navigation="Application / Parkings">

        <div>
          <Link to="/addparking" >
            <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
              <ContentAdd />
            </FloatingActionButton>
          </Link>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderColumn style={styles.columns.title}>Title</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.owner}>Owner</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.location}>Location</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.capacity}>Capacity</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.createdAt}>Created at</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.edit}>Edit</TableHeaderColumn>
              </TableRow>
            </TableHeader>
             { (this.state.Data.length > 0) &&
            <TableBody>{
                this.state.Data.map(item =>
                <TableRow key={item._id}>
                  <TableRowColumn style={styles.columns.title}>{item.title}</TableRowColumn>
                  <TableRowColumn style={styles.columns.owner}>{item.owner.email}</TableRowColumn>
                  <TableRowColumn style={styles.columns.location}>asba</TableRowColumn>
                  <TableRowColumn style={styles.columns.capacity}>{item.capacity}</TableRowColumn>
                  <TableRowColumn style={styles.columns.createdAt}>{item.createdAt}</TableRowColumn>
                  <TableRowColumn style={styles.columns.edit}>
                    <Link className="button" to="/addparking">
                      <FloatingActionButton zDepth={0}
                                            mini={true}
                                            backgroundColor={grey200}
                                            iconStyle={styles.editButton}>
                        <ContentCreate  />
                      </FloatingActionButton>
                    </Link>
                  </TableRowColumn>
                </TableRow>)}
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

export default Myparkings;
