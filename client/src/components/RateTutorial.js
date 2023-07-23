import { React, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { StarBorder } from '@material-ui/icons';
import { useParams } from 'react-router-dom';



function RateTutorial() {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    
      <Box component="fieldset" mt={3}mb={3} borderColor="transparent">
        <Typography component="legend">Rate this tutorial:</Typography>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
        />
      </Box>
  );
}

export default RateTutorial;
