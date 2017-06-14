import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import globalStyles from '../styles';

const PageBase = (props) => {

    const {title, navigation} = props;

    return (
      <div>
        <span style={globalStyles.navigation}>{navigation}</span>

        <Paper style={globalStyles.paper}>
          <h3 style={globalStyles.title}>{title}</h3>

          <Divider/>
          {props.children}

          <div style={globalStyles.clear}/>

        </Paper>
      </div>
    );
};



export default PageBase;
