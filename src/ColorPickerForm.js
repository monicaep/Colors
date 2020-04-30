import React from 'react';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { ChromePicker } from 'react-color';
import useStyles from './styles/ColorPickerFormStyles';

export default function ColorPickerForm(props) {
  const classes = useStyles();
  const [currentColor, setCurrentColor] = React.useState('teal');
  const [newColorName, setNewColorName] = React.useState('');

  React.useEffect(() => {
      ValidatorForm.addValidationRule('uniqueColorName', (value) => {
        for (let color of props.colors) {
          if (value.toLowerCase() === color.name.toLowerCase()) {
            return false;
          }
        }
        return true;
      });
  
      ValidatorForm.addValidationRule('uniqueColor', (value) => {
        for (let color of props.colors) {
          if (currentColor === color.color) {
            return false;
          }
        }
        return true;
      });
  });

  const handleColorChange = (e) => {
  setCurrentColor(e.hex);
  }

  const handleColorNameChange = (e) => {
      setNewColorName(e.target.value);
  }

  const handleSubmit = () => {
      const newColor = {
          color: currentColor,
          name: newColorName
        }
      props.addNewColor(newColor);
      setNewColorName('');
  }

  return (
      <div>
          <ChromePicker 
            className={classes.picker}
            color={currentColor}
            onChangeComplete={handleColorChange}
          />
          <ValidatorForm
            onSubmit={handleSubmit}
          >
            <TextValidator
              className={classes.colorNameInput}
              value={newColorName}
              name='newColorName'
              placeholder='Color Name'
              onChange={handleColorNameChange}
              validators={['required', 'uniqueColorName', 'uniqueColor']}
              errorMessages={['color name is required', 'color name must be unique', 'color already used']} 
            />
            <Button 
              className={classes.addColor}
              type='submit'
              variant='contained' 
              color='primary'
              style={{backgroundColor: currentColor}}
              disabled = {props.paletteIsFull}
            >
              {props.paletteIsFull ? 'Palette Full' : 'Add Color'}
            </Button>
          </ValidatorForm>
      </div>
  )
}