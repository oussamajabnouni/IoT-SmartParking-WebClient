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



class Parkings extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      Data: [],
      notFound : false,
      isLoading:true
    }
  }
  componentDidMount() {
   agent.Parkings.byOwner().then(data =>{
      if(data.length > 0){
        console.log(data)
        this.setState({
          Data:data,
          isLoading:false
        })
      }else{
        this.setState({
          notFound:true,
          isLoading:false
        })
      }
      }
    ).catch(error=>console.log(error))
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
        title: {
          width: '40%'
        },
        owner: {
          width: '20%'
        },
        location: {
          width: '10%'
        },
        capacity: {
          width: '10%'
        },
        createdAt: {
          width: '20%'
        },
        edit: {
          width: '10%'
        }
      }
    };

                
    return (
      <PageBase title="Parkings"
                navigation="Application / Parkings">
        <div>
          <Link to="/addparking" >
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
                <TableHeaderColumn style={styles.columns.title}>Title</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.location}>Reserved lots</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.capacity}>Capacity</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.owner}>Hour Price</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.createdAt}>Created At</TableHeaderColumn>
                <TableHeaderColumn style={styles.columns.edit}>Edit</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            {
            (this.state.notFound) &&
            <TableBody>
                <TableRow>
                  <TableRowColumn style={{width:'100%'}}>No Parking found</TableRowColumn>
                </TableRow>
            </TableBody>
            }
            { (!this.state.notFound&&!this.state.isLoading) &&
            <TableBody>{
              this.state.Data.map(item =>
                <TableRow key={item._id}>
                  <TableRowColumn style={styles.columns.title}>{item.title}</TableRowColumn>
                  <TableRowColumn style={styles.columns.location}>{item.reserved}</TableRowColumn>
                  <TableRowColumn style={styles.columns.capacity}>{item.capacity}</TableRowColumn>
                  <TableRowColumn style={styles.columns.owner}>{item.hourprice} TD</TableRowColumn>
                  <TableRowColumn style={styles.columns.createdAt}>{item.createdAt.substring(0, 10)}</TableRowColumn>
                  <TableRowColumn style={styles.columns.edit}>
                    <Link className="button" to={"/editparking/"+item._id}>
                      <FloatingActionButton zDepth={0}
                                            mini={true}
                                            backgroundColor={grey200}
                                            iconStyle={styles.editButton}>
                        <ContentCreate  />
                      </FloatingActionButton>
                    </Link>
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
            }
          </Table>   
            {(this.state.isLoading)&&    
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

export default Parkings;
