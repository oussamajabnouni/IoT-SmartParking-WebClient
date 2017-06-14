import React, {PropTypes} from 'react';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {grey400, cyan600, white} from 'material-ui/styles/colors';
import {typography} from 'material-ui/styles';
import Wallpaper from 'material-ui/svg-icons/device/wallpaper';

const HistoryList = (props) => {

  const styles = {
    subheader: {
      fontSize: 24,
      fontWeight: typography.fontWeightLight,
      backgroundColor: cyan600,
      color: white,
      
    },
    contain:{
        overflow:'scroll',
        height:288
    }
  };

  const iconButtonElement = (
    <IconButton
      touch={true}
      tooltipPosition="bottom-left"
    >
      <MoreVertIcon color={grey400} />
    </IconButton>
  );

  const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
      <MenuItem>View</MenuItem>
    </IconMenu>
  );
  if(props.isadmin){
      return (
        <Paper>
          <List>
            <Subheader style={styles.subheader}>Parking owners</Subheader>
            <div style={styles.contain}>
            {props.data.filter((item)=>item.email!=="osama.jbnoni@gmail.com").map(item =>
              <div key={item._id}>
                <ListItem
                  leftAvatar={<Avatar icon={<Wallpaper />} />}
                  primaryText={item.email}
                  secondaryText={"Account balance : "+item.balance+" share: "+item.share+" %"}
                  rightIconButton={rightIconMenu}
                />
                <Divider inset={true} />
              </div>
            )}
            </div>
          </List>
        </Paper>
      );
  }
  return (
    <Paper>
      <List>
        <Subheader style={styles.subheader}>Recent Reservations</Subheader>
        <div style={styles.contain}>
        {props.data.map(item =>
          <div key={item._id}>
            <ListItem
              leftAvatar={<Avatar icon={<Wallpaper />} />}
              primaryText={item.parking.title}
              secondaryText={"price : "+item.price+" duration: "+item.period+" Hours"}
              rightIconButton={rightIconMenu}
            />
            <Divider inset={true} />
          </div>
        )}
        </div>
      </List>
    </Paper>
  );
};



export default HistoryList;
