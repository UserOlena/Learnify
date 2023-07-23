import { React } from 'react';

import { Box, Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { StarBorder } from '@material-ui/icons';

import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../utils/mutations/reviewMutations';


export function RateTutorial() {
<Box
  component='fieldset'
  mt={3}
  mb={3}
  borderColor='transparent'
>
  <Typography component='legend'>Rate this tutorial:</Typography>
  <Rating
    name='customized-empty'
    defaultValue={0}
    precision={1}
    emptyIcon={<StarBorder fontSize='inherit' />}
  />
</Box>;
};

export default RateTutorial;
