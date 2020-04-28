import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css'

export default function PaletteNamerForm(props) {
  const [newPaletteName, setNewPaletteName] = React.useState('');
  const [stage, setStage] = React.useState('form');

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

  const handlePaletteSubmit = (emoji) => {
    let newName = newPaletteName;
    const newPalette = {
        paletteName: newName,
        id: newName.toLowerCase().replace(/ /g, '-'),
        emoji: emoji.native,
        colors: props.colors
    }
    props.savePalette(newPalette);
    setStage('');
    props.history.push('/');
  }

  const handlePaletteNameChange = (e) => {
    setNewPaletteName(e.target.value);
  }

  const showEmojiPicker = () => {
    setStage('emoji');
  }

  return (
    <div>
      <Dialog open={stage === 'emoji'}>
        <DialogTitle id="form-dialog-title">Pick a Palette Emoji</DialogTitle>
        <Picker onSelect={handlePaletteSubmit} title='Pick a Palette Emoji'/>
      </Dialog>
      <Dialog open={stage === 'form'} onClose={props.hideForm} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
          <DialogContent>
              <TextValidator 
                lable='Palette Name'
                value={newPaletteName}
                name='newPaletteName'
                onChange={handlePaletteNameChange}
                validators={['required', 'uniquePaletteName']}
                errorMessages={['palette name is required', 'palette name must be unique']}
                fullWidth
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.hideForm} color="primary">
              Cancel
            </Button>
            <Button 
              type='submit'
              variant='contained' 
              color='primary'
            >
              Save
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    </div>
  );
}
