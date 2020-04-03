import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { arrayMove } from 'react-sortable-hoc';
import DraggableColorList from './DraggableColorList';

const drawerWidth = 350;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
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
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    height: 'calc(100vh - 64px)'
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawerContent: {
      display: 'flex',
      height: '100%',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
  }
}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [currentColor, setCurrentColor] = React.useState('yellow');
  const [colors, setColors] = React.useState([]);
  const [newColorName, setNewColorName] = React.useState('');
  const [newPaletteName, setNewPaletteName] = React.useState('');
  
  React.useEffect(() => {
    ValidatorForm.addValidationRule('uniqueColorName', (value) => {
      for (let color of colors) {
        if (value.toLowerCase() === color.name.toLowerCase()) {
          return false;
        }
      }
      return true;
    });

    ValidatorForm.addValidationRule('uniqueColor', (value) => {
      for (let color of colors) {
        if (currentColor === color.color) {
          return false;
        }
      }
      return true;
    });

    ValidatorForm.addValidationRule('uniquePaletteName', (value) => {
      for (let palette of props.palettes) {
        if(value.toLowerCase() === palette.paletteName.toLowerCase()) {
          return false;
        }
      }
      return true;
    });
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleColorChange = (e) => {
    setCurrentColor(e.hex);
  }

  const addNewColor = () => {
    const newColor = {
      color: currentColor,
      name: newColorName
    }
    setColors([...colors, newColor]);
    setNewColorName('');
  }

  const handleColorNameChange = (e) => {
    setNewColorName(e.target.value);
  }

  const handleColorDelete = (colorName) => {
    setColors(colors.filter(color => color.name !== colorName));
  }

  const handlePaletteSubmit = () => {
    let newName = newPaletteName;
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, '-'),
      colors: colors
    }
    props.savePalette(newPalette);
    props.history.push('/');
  }

  const handlePaletteNameChange = (e) => {
    setNewPaletteName(e.target.value)
  }

  const onSortEnd = ({oldIndex, newIndex}) => {
    setColors(arrayMove(colors, oldIndex, newIndex))
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color='default'
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
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
          </ValidatorForm>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon /> 
          </IconButton>
        </div>
        <Divider />
        <div className={classes.drawerContent}>
            <Typography variant='h4'>Design Your Palette</Typography>
            <div>
                <Button variant='contained' color='primary'>Random Color</Button>
                <Button variant='contained' color='secondary'>Clear Palette</Button>
            </div>
            <ChromePicker 
              color={currentColor}
              onChangeComplete={handleColorChange}
            />
            <ValidatorForm
              onSubmit={addNewColor}
            >
              <TextValidator
                value={newColorName}
                name='newColorName'
                onChange={handleColorNameChange}
                validators={['required', 'uniqueColorName', 'uniqueColor']}
                errorMessages={['color name is required', 'color name must be unique', 'color already used']} 
              />
              <Button 
                type='submit'
                variant='contained' 
                color='primary'
                style={{backgroundColor: currentColor}}
              >
                Add Color
              </Button>
            </ValidatorForm>
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DraggableColorList 
          colors={colors} 
          handleColorDelete={handleColorDelete}
          axis='xy'
          onSortEnd={onSortEnd}
        />
      </main>
    </div>
  );
}

