import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2)
    },
    hide: {
        display: 'none'
    }
}));

export default function PaletteFormNav(props) {
    const classes = useStyles();
    const [newPaletteName, setNewPaletteName] = React.useState('');

    React.useEffect(() => {
        ValidatorForm.addValidationRule('uniquePaletteName', (value) => {
            for (let palette of props.palettes) {
              if(value.toLowerCase() === palette.paletteName.toLowerCase()) {
                return false;
              }
            }
            return true;
        });
    });

    const handlePaletteSubmit = () => {
        let newName = newPaletteName;
        const newPalette = {
            paletteName: newName,
            id: newName.toLowerCase().replace(/ /g, '-'),
            colors: props.colors
        }
        props.savePalette(newPalette);
        props.history.push('/');
        console.log('submitting');
    }
    
    const handlePaletteNameChange = (e) => {
        setNewPaletteName(e.target.value);
    }

    return (
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
                Persistent drawer
            </Typography>
            <ValidatorForm onSubmit={handlePaletteSubmit}>
                <TextValidator 
                    lable='Palette Name'
                    value={newPaletteName}
                    name='newPaletteName'
                    onChange={handlePaletteNameChange}
                    validators={['required', 'uniquePaletteName']}
                    errorMessages={['palette name is required', 'palette name must be unique']}
                />
                <Button 
                    type='submit'
                    variant='contained' 
                    color='primary'
                >
                    Save Palette
                </Button>
                <Link to='/'>
                    <Button variant='contained' color='secondary'>Go Back</Button>
                </Link>
            </ValidatorForm>
        </Toolbar>
    )
}
