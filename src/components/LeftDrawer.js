import React from 'react';
import Drawer from 'material-ui/Drawer';
import {spacing, typography} from 'material-ui/styles';
import {white, blue600} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Face from 'material-ui/svg-icons/action/face';
import Assessment from 'material-ui/svg-icons/action/assessment';
import People from 'material-ui/svg-icons/social/people';
import LocationOn from 'material-ui/svg-icons/communication/location-on';
import Settings from 'material-ui/svg-icons/action/settings';


const LeftDrawer = (props) => {

  let { navDrawerOpen,currentUser } = props;

  const styles = {
    logo: {
      cursor: 'pointer',
      fontSize: 25,
      color: typography.textFullWhite,
      lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: typography.fontWeightLight,
      backgroundColor: blue600,
      paddingLeft: 40,
      height: 56,
    },
    menuItem: {
      color: 'white',
      fontSize: 14
    },
    avatar: {
      div: {
        padding: '15px 0 20px 15px',
        backgroundImage:  'url(' + require('../../material_bg.png') + ')',
        height: 70
      },
      icon: {
        float: 'left',
        display: 'block',
        marginRight: 15,
        boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
      },
      span: {
        fontSize:18,
        paddingTop: 8,
        display: 'block',
        color: 'white',
        fontWeight: 300,
        textShadow: '1px 1px #444'
      }
    }
  };
  const  listAdmin = [
    { title: 'Dashboard', link: '/', icon: <Assessment/>},
    { title: 'Parking Owners', link: '/owners', icon: <People/>},
    { title: 'Settings', link: '/settings', icon: <Settings/>}
   ];

   const  listOwner = [
    { title: 'Dashboard', link: '/', icon: <Assessment/>},
    { title: 'My Parkings', link: '/parkings', icon: <LocationOn/>},
    { title: 'Settings', link: '/settings', icon: <Settings/>}
   ];
  const list = currentUser&&currentUser.email==='osama.jbnoni@gmail.com'?listAdmin:listOwner;               
  return (
    <Drawer
      docked={true}
      open={navDrawerOpen}>
        <div style={styles.logo}>
          Control Panel
        </div>
        <div style={styles.avatar.div}>
          <Avatar icon={<Face/>} style={styles.avatar.icon}>
          </Avatar>
          <span style={styles.avatar.span}>
            {currentUser?currentUser.email.replace(/@.*$/,""):<span>Welcome</span>}
          </span>
        </div>
        <div>
          {list.map((menu, index) =>
            <MenuItem
              key={index}
              style={styles.menuItem}
              primaryText={menu.title}
              leftIcon={menu.icon}
              containerElement={<Link to={menu.link}/>}
            />
          )}
        </div>
    </Drawer>
  );
};



export default LeftDrawer;