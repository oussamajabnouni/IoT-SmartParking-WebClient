import React, { Component } from 'react';
import agent from '../../agent';
import Dropzone from 'react-dropzone'
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import Backup from 'material-ui/svg-icons/action/backup';
import {blueGrey100} from 'material-ui/styles/colors';

class Upload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading:false,
            url:''
        }
    }

    onDrop(files) {
        this.setState({isLoading:true})
        agent.Parkings.upload(files[0]).then(Data=>{
            this.setState({url:Data.url,isLoading:false})
            this.props.handleImage(this.state.url)
        })
    }

    render() {
        const { url,isLoading } = this.state;
        const overlayStyle = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        padding: '2.5em 0',
        textAlign: 'center',
         };
        const styles = {
        button: {
            margin: 12,
        },
        image: {
            width: '300px',
            height: '300px',
            objectFit: 'cover'
        },
        icon:{
            width: 100,
            height: 100,
        }
        };
        return (  
            <Dropzone
                style={overlayStyle}
                onDrop={this.onDrop.bind(this)}
            >
            {!isLoading&&!url&&
                <div>
                <Backup color={blueGrey100} style={styles.icon}/>
                <h1>Drag and drop here image to upload</h1>
                <h4>Or</h4>
                <RaisedButton
                label="Select an Image"
                labelPosition="before"
                style={styles.button}
                >
                </RaisedButton>
                </div>}
            {isLoading&&<CircularProgress />}
            {
            url&&<img src={url} style={styles.image} />
            }
            </Dropzone>
        );
    }
}

export default Upload;