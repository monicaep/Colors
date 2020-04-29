import React, { Component } from 'react';
import { Link }  from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Slider from 'rc-slider';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import 'rc-slider/assets/index.css';
import styles from './styles/NavbarStyles';

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { format: "hex", open: false };
        this.handleFormatChange = this.handleFormatChange.bind(this);
        this.closeSnackbar = this.closeSnackbar.bind(this);
    }

    handleFormatChange(e) {
        this.setState({ format: e.target.value, open: true });
        this.props.handleChange(e.target.value);
    }

    closeSnackbar() {
        this.setState({ open: false });
    }

    render() {
        const { classes } = this.props;

        return (
            <nav className={classes.navbar}>
                <div className={classes.logo}>
                    <Link to='/'>reactcolorpicker</Link>
                </div>
                {this.props.showingAllColors && (
                    <div className={classes.selectContainer}>
                        <span>Level: {this.props.level}</span>
                        <div className={classes.slider}>
                            <Slider 
                                defaultValue={this.props.level} 
                                min={100} 
                                max={900} 
                                step={100}
                                onAfterChange={this.props.changeLevel} 
                            />
                        </div>
                    </div>
                )}
                
                <div className={classes.selectContainer}>
                    <Select value={this.state.format} onChange={this.handleFormatChange}>
                        <MenuItem value='hex'>HEX - #ffffff</MenuItem>
                        <MenuItem value='rgb'>RGB - rgb(255, 255, 255)</MenuItem>
                        <MenuItem value='rgba'>RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
                    </Select>
                </div>
                <div>
                    <Snackbar 
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                        open={this.state.open}
                        autoHideDuration={3000}
                        onClose={this.closeSnackbar}
                        message={<span id='message-id'>Format changed to: {this.state.format.toUpperCase()}</span>}
                        ContentProps={{
                            "aria-describedby": "message-id"
                        }}
                        action={
                            <IconButton size="small" aria-label="close" color="inherit" onClick={this.closeSnackbar}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        }
                    />
                </div>
            </nav>
        )
    }
}

export default withStyles(styles)(Navbar);