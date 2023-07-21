import { React, useState } from 'react';
import { 
  TextField, 
  Typography 
} from '@mui/material';
import { isEmptyInput } from '../utils/validation';

export function AddLesson(props) {
  const inputDefaultValues = {
    value: '',
    isEmpty: false,
    isValid: true,
  };

  const [name, setName] = useState(inputDefaultValues);
  const [body, setBody] = useState(inputDefaultValues);
  const [media, setMedia] = useState(inputDefaultValues);
  const [duration, setDuration] = useState(inputDefaultValues);

  // set a new value to the state.value associated to the text field that invokes this function
  function handleOnChange(inputValue, setState) {
    setState((otherValues) => ({
      ...otherValues,
      value: inputValue,
    }));
  }

  // verify that the input is non-blank
  // set the associated state to display the appropriate error message based on the validation result
  function handleOnBlur(inputValue, setState) {
    // ensure that the input is not empty
    if (isEmptyInput(inputValue)) {
      setState((otherValues) => ({
        ...otherValues,
        isEmpty: true,
      }));
      return;
    }
  }

  // update the state to clear the error when the user focuses on that field
  function handleOnFocus(state, setState) {
    // change state to remove the error message on Focus if previously input was empty
    if (state.isEmpty) {
      setState((otherValues) => ({
        ...otherValues,
        isEmpty: false,
      }));
      return;
    }
  }

  return (
    <div>
      <Typography>
        Lesson #{props.number}
      </Typography>
      <TextField
        required
        fullWidth
        id={'name' + props.number}
        name='name'
        label='Name'
        margin='normal'
        onChange={(e) => handleOnChange(e.target.value.trim(), setName)}
        onBlur={(e) => handleOnBlur(e.target.value, setName)}
        error={name.isEmpty}
        helperText={name.isEmpty && 'Please enter a name for your lesson'}
        onFocus={() => handleOnFocus(name, setName)}
      />
      <TextField
        required
        fullWidth
        id={'body' + props.number}
        name='body'
        label='Body'
        margin='normal'
        onChange={(e) => handleOnChange(e.target.value.trim(), setBody)}
        onBlur={(e) => handleOnBlur(e.target.value, setBody)}
        error={body.isEmpty}
        helperText={
          body.isEmpty && 'Please enter the body of your lesson'
        }
        onFocus={() => handleOnFocus(body, setBody)}
      />
      <TextField
        fullWidth
        id={'media' + props.number}
        name='media'
        label='Media'
        margin='normal'
        onChange={(e) => handleOnChange(e.target.value.trim(), setMedia)}
      />
      <TextField
        required
        fullWidth
        id={'duration' + props.number}
        name='duration'
        label='Duration'
        margin='normal'
        onChange={(e) => handleOnChange(e.target.value.trim(), setDuration)}
        onBlur={(e) => handleOnBlur(e.target.value, setDuration)}
        error={duration.isEmpty}
        helperText={
          duration.isEmpty &&
          'Please enter the duration of this lesson'
        }
        onFocus={() => handleOnFocus(duration, setDuration)}
      />
    </div>
  );
}

export default AddLesson;
