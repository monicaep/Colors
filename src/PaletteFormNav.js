import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import PaletteNamerForm from './PaletteNamerForm';

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px'
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    hide: {
        display: 'none'
    },
    navBtns: {
        marginRight: '1rem'
    },
    button: {
        textDecoration: 'none',
        margin: "0 0.5rem"
    }
}));

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
