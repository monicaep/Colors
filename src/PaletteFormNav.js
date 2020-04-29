import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import PaletteNamerForm from './PaletteNamerForm';
import useStyles from './styles/PaletteFormNavStyles';

export default function PaletteFormNav(props) {
    const classes = useStyles();
    const [formShowing, setFormShowing] = React.useState(false);

    const showForm = () => {
        setFormShowing(true);
        console.log(formShowing);
    }

    const hideForm = () => {
        setFormShowing(false);
    }

    return (
        <div className={classes.root}>
            <AppBar
                position="fixed"
                color='default'
                className={clsx(classes.appBar, {
                [classes.appBarShift]: props.open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={props.handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, props.open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Create A Palette
                    </Typography>
                </Toolbar>
                <div className={classes.navBtns}>
                    <Link className={classes.button} to='/'>
                        <Button variant='contained' color='secondary'>Go Back</Button>
                    </Link>
                    <Button className={classes.button} variant="contained" color="primary" onClick={showForm}>
                        Save
                    </Button>
                </div>
            </AppBar>
            {formShowing && 
                <PaletteNamerForm 
                    palettes={props.palettes}
                    colors={props.colors}
                    savePalette={props.savePalette}
                    history={props.history}
                    open={formShowing}
                    hideForm={hideForm}
                />
            }
        </div>
    )
}
