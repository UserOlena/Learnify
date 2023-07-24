import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Beckee from '../images/beckee.jpg';
import Ryan from '../images/ryan.jpg';

const useStyles = makeStyles((theme) => ({
  box: {
    width: 'calc(50% - 20px)', 
    boxSizing: 'border-box',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '2px solid #ccc', 
    borderRadius: '8px',
    backgroundColor: '#FAF0E6', 
    marginBottom: '20px', 
    [theme.breakpoints.down('sm')]: {
      width: '100%', 
    },
    userSelect: 'none',
  },
}));
const boxData = [
  {
    id: 1,
    imageSrc: Beckee,
    title: 'Beckee Roos',
    description: "Beckee grew up in San Diego, California and moved to Berkeley, California in 2007 to complete her undergraduate studies at UC Berkeley. She loves all things puzzles—jigsaw puzzles, crosswords, and Wordle, to name a few. Her favorite hobby is rock climbing, which is kind of like a puzzle for your body. She is also passionate about cats, sandwiches, and watching music videos. A random fun fact about her is that she didn't get her driver's license until she was 31.",
  },
  {
    id: 2,
    imageSrc:  Ryan,
    title: 'Ryan Acevedo Slaughter',
    description: "Ryan is originally from Tampa, Florida but currently lives in San Francisco Californina. He has been a social studies teacher for three years and has a Master's Degree from Florida State University in Education. He is a big sports fan and gamer. Rays up!",
  },
  {
    id: 3,
    imageSrc: 'image3.jpg',
    title: 'Box 3',
    description: 'Description for Box 3',
  },
  {
    id: 4,
    imageSrc: 'image4.jpg',
    title: 'Box 4',
    description: 'Description for Box 4',
  },
  {
    id: 5,
    imageSrc: 'image5.jpg',
    title: 'Box 5',
    description: 'Description for Box 5',
  },
];

export function WhoWeAre() {
  const classes = useStyles();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Who We Are</h1>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '20px', 
        }}
      >
        {boxData.map((box) => (
          <div
            key={box.id}
            className={classes.box}
          >
            <div
              style={{
                width: '100px', 
                height: '100px', 
                borderRadius: '50%', 
                overflow: 'hidden', 
                marginBottom: '10px', 
              }}
            >
              <img
                src={box.imageSrc}
                alt={`Image for ${box.title}`}
                style={{
                  width: '100%', // Make sure the image covers the circle entirely
                  height: '100%', // Make sure the image covers the circle entirely
                  objectFit: 'cover', // Avoid stretching the image
                }}
              />
            </div>
            <h3>{box.title}</h3>
            <p>{box.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WhoWeAre;