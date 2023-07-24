import { React, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

export function RateTutorial() {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <Box
      component='div'
      mt={3}
      mb={1}
      borderColor='transparent'
      display='flex'
      justifyContent='center'
    >
      <Typography style={{ marginRight: '3%' }}>Rate this tutorial:</Typography>
      <Rating
        name='simple-controlled'
        required
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
