import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
    root: {
        backgroundColor: 'white',
        border: '1px solid black',
        borderRadius: '5px',
        padding: '0.5rem',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        '&:hover svg': {
            opacity: '1'
        }
    },
    colors: {
        backgroundColor: 'gray',
        height: '100px',
        width: '100%',
        borderRadius: '5px',
        overflow: 'hidden'
    },
    title: {
        display: 'flex',
        justifyContent: 'spae-between',
        alignItems: 'center',
        margin: '0',
        color: 'black',
        paddingTop: '0.5rem',
        fontSize: '1rem',
        position: 'relative'
    },
    emoji: {
        marginLeft: '0.5rem',
        fontSize: '1.5rem'
    },
    miniColor: {
        height: '25%',
        width: '20%',
        display: 'inline-block',
        margin: '0 auto',
        position: 'relative',
        marginBottom: '-3.5px'
    },
    delete: {

    },
    deleteIcon: {
        color: 'white',
        backgroundColor: '#eb3d30',
        width: '15px',
        height: '15px',
        position: 'absolute',
        right: '0px',
        top: '0px',
        padding: '10px',
        zIndex: '10',
        opacity: '0',
        borderRadius: '4px'
    }
}

class MiniPalette extends Component {
    constructor(props) {
        super(props);
        this.deletePalette = this.deletePalette.bind(this);
    }

    deletePalette(e) {
        e.stopPropagation();
        this.props.openDialog(this.props.id);
    }

    render() {
        const {classes, handleClick, paletteName, emoji, colors} = this.props;

        const miniColorBoxes = colors.map(color => (
            <div 
                className={classes.miniColor} 
                    style={{backgroundColor: color.color}}
                    key={color.name}
            />
        ))

        return (
            <div className={classes.root} onClick={handleClick}>
                <DeleteIcon className={classes.deleteIcon} 
                    style={{transition: 'all 0.3s ease-in-out'}}
                    onClick={this.deletePalette}
                />
                <div className={classes.colors}>
                    {miniColorBoxes}
                </div>
                <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
            </div>
        )
    }
}

export default withStyles(styles)(MiniPalette);