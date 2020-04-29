import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/MiniPaletteStyles';

class MiniPalette extends PureComponent {
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
            <div className={classes.root} onClick={() => handleClick(this.props.id)}>
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