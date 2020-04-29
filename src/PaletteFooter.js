import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    footer: {
        backgroundColor: 'white',
        height: '5vh',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    emoji: {
        fontSize: '1.5rem',
        margin: '1rem'
    }
}

function PaletteFooter(props) {
    const { paletteName, emoji, classes } = props;
    return (
        <footer className={classes.footer}>
            {paletteName}
            <span className={classes.emoji}>{emoji}</span>
        </footer>
    )
}

export default withStyles(styles)(PaletteFooter);