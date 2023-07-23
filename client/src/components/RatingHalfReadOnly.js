import { React } from 'react';
import { Rating, Stack } from '@mui/material';

export function HalfRating(props) {
  return (
    <Stack spacing={1}>
      <Rating
        name='half-rating-read'
        size='small'
        defaultValue={props.raiting}
        precision={0.5}
        readOnly
        style={{padding: '1rem 0'}}
      />
    </Stack>
  );
}

export default HalfRating;
