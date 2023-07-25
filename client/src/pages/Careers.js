import  { React, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, TextField, Button } from '@material-ui/core';
import emailjs from 'emailjs-com';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    userSelect: 'none',
  },
  contentContainer: {
    textAlign: 'center',
  },
  card: {
    width: '600px',
    margin: '0 auto',
    marginTop: theme.spacing(4),
    padding: theme.spacing(3),
    backgroundColor: '#92b4d4',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'relative', 
    overflow: 'hidden', 
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  inputField: {
    marginBottom: theme.spacing(2),
    color: 'white',
    width: '100%',
    '& label': {
      color: 'black',
    },
    '& input': {
      color: 'black', 
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'gray',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
    },
  },
  successMessage: {
    color: 'black',
    userSelect: 'none',
  },
}));

export function Careers() {
  const classes = useStyles();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsFormSubmitted(true);

    const name = event.target.elements.name.value;
    const email = event.target.elements.email.value;
    const message = event.target.elements.message.value;

    emailjs.send('service_oeuhp1s', 'template_o26m0jk', {
      name,
      email,
      message
    }, 'coAg8Q0pV7_BvTjir')
      .then(() => {
        setIsFormSubmitted(true);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  };

  return (
    <div className={classes.root}>
      <div className={classes.contentContainer}>
        <Typography variant="h4" gutterBottom>
          Want to work for Learnify? 
        </Typography>
        <Typography variant="h4" gutterBottom>
        Contact us!
        </Typography>
        <div className={classes.card}>
          <div className={classes.borderAnimation}></div>
          {!isFormSubmitted ? (
            <form className={classes.form} onSubmit={handleSubmit}>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                className={classes.inputField}
                required
              />
              <TextField
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                className={classes.inputField}
                required
              />
              <TextField
                id="message"
                label="Tell us a little about yourself"
                multiline
                rows={4}
                variant="outlined"
                className={classes.inputField}
                required
              />
              <Button
                type="submit"
                variant="contained"
                className={classes.submitButton}
              >
                Send Message
              </Button>
            </form>
          ) : (
            <>
              <Typography variant="h5" className={classes.successMessage}>
                Message sent successfully!
              </Typography>
              <Typography variant="body1">
                Thank you for your message. We will get back to you soon.
              </Typography>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Careers;