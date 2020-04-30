import React from 'react';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import { arrayMove } from 'react-sortable-hoc';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import seedColors from './seedColors';
import useStyles from './styles/NewPaletteFormStyles';

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [colors, setColors] = React.useState(seedColors[0].colors);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const addNewColor = (newColor) => {
    setColors([...colors, newColor]);
  }

  const handleColorDelete = (colorName) => {
    setColors(colors.filter(color => color.name !== colorName));
  }

  const onSortEnd = ({oldIndex, newIndex}) => {
    setColors(arrayMove(colors, oldIndex, newIndex));
  }

  const clearPalette = () => {
    setColors([]);
  }

  const randomColor = () => {
    const allColors = props.palettes.map(p => p.colors).flat();
    let randomColor = allColors[Math.floor(Math.random() * allColors.length)];
    setColors([...colors, randomColor]);
  }

  const paletteIsFull = (colors.length >= 20);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <PaletteFormNav 
        palettes={props.palettes}
        handleDrawerOpen={handleDrawerOpen}
        open={open}
        colors={colors}
        savePalette={props.savePalette}
        history={props.history}
      />
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
            <Typography variant='h4' gutterBottom>Design Your Palette</Typography>
            <div className={classes.drawerBtns}>
                <Button 
                  className={classes.button}
                  variant='contained' 
                  color={paletteIsFull ? 'gray' : 'primary'}
                  onClick={randomColor}
                  disabled={paletteIsFull}
                >
                  {paletteIsFull ? 'Palette Full' : 'Random Color'}
                </Button>
                <Button 
                  className={classes.button}
                  variant='contained' 
                  color='secondary' 
                  onClick={clearPalette}
                >
                  Clear Palette
                </Button>
            </div>
            <ColorPickerForm
              colors={colors}
              paletteIsFull={paletteIsFull}
              addNewColor={addNewColor}
            />
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