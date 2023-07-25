import { React, useState } from 'react';
import { TextField, Button, Typography, Grid, Box } from '@mui/material';
import contactMe from '../images/contactMe.png';
import emailjs from 'emailjs-com';

export function Careers() {
  const [name, setName] = useState('');
  const [isEmptyName, setIsEmptyName] = useState(false);
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isEmptyEmail, setIsEmptyEmail] = useState(false);
  const [message, setMessage] = useState('');
  const [isEmptyMessage, setIsEmptyMessage] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // function is called on submit button click
  function handleSubmit(e) {
    e.preventDefault();
    validateEmail();

    setIsFormSubmitted(true);

    emailjs
      .send(
        'service_oeuhp1s',
        'template_o26m0jk',
        {
          name,
          email,
          message,
        },
        'coAg8Q0pV7_BvTjir'
      )
      .then(() => {
        setIsFormSubmitted(true);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }

  // function validates email input
  function validateEmail() {
    if (emailRegex.test(email)) {
      return true;
    } else {
      return false;
    }
  }

  // validates if input is empty. if so, changing the state of that input
  function isInputEmpty(input, state) {
    if (input.length === 0) {
      state(true);
    }
  }

  // on email input focus checking which error is active and changing its state to remove an error
  function handleOnFocusEmail() {
    if (isEmptyEmail) {
      setIsEmptyEmail(false);
    }

    if (!isValidEmail) {
      setIsValidEmail(true);
    }
  }

  // vefifies the input value to set the appropriate state to display an error if condition is met
  function verifyEmailInput(input, state) {
    if (isInputEmpty(input, state)) {
      return;
    } else if (!validateEmail()) {
      setIsValidEmail(false);
    }
  }

  return (
    <Box sx={{ height: '100vh' }}>
      <Grid
        container
        direction='column'
        alignItems='center'
        justifyContent='center'
        sx={{ height: '100%' }}
      >
        <Grid
          item
          xs={12}
          md={4}
        >
          <Box sx={{ p: 2 }}>
            <Typography
              variant='h4'
              align='center'
              mb={2}
            >
              Contact Us
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid
                container
                spacing={2}
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img
                      src={contactMe}
                      alt='Contact'
                      style={{ maxWidth: '90%' }}
                    />
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                >
                  <TextField
                    fullWidth
                    label='Name'
                    value={name}
                    margin='normal'
                    required
                    error={isEmptyName}
                    helperText={isEmptyName ? 'Name field is required' : null}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={(e) =>
                      isInputEmpty(e.target.value.trim(), setIsEmptyName)
                    }
                    onFocus={() => setIsEmptyName(false)}
                  />
                  <TextField
                    fullWidth
                    label='Email'
                    value={email}
                    margin='normal'
                    required
                    error={isEmptyEmail || !isValidEmail}
                    helperText={
                      (isEmptyEmail && 'Email field is required') ||
                      (!isValidEmail &&
                        'Kindly provide a legitimate email address.')
                    }
                    onChange={(e) =>
                      setEmail(e.target.value.trim().toLowerCase())
                    }
                    onBlur={(e) =>
                      verifyEmailInput(e.target.value.trim(), setIsEmptyEmail)
                    }
                    onFocus={() => handleOnFocusEmail()}
                  />
                  <TextField
                    fullWidth
                    label='Message'
                    value={message}
                    margin='normal'
                    required
                    multiline
                    rows={4}
                    error={isEmptyMessage}
                    helperText={
                      isEmptyMessage ? 'Message field is required' : null
                    }
                    onChange={(e) => setMessage(e.target.value)}
                    onBlur={(e) =>
                      isInputEmpty(e.target.value.trim(), setIsEmptyMessage)
                    }
                    onFocus={() => setIsEmptyMessage(false)}
                  />
                  <Button
                    variant='contained'
                    type='submit'
                    sx={{ mt: 2 }}
                    onClick={(e) => handleSubmit(e)}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
            {isFormSubmitted && (
              <>
                <Typography
                  variant='h5'
                  style={{
                    marginTop: '7rem',
                  }}
                >
                  Message sent successfully!
                </Typography>
                <Typography variant='body1'>
                  Kindly note that this email is not monitored, and the website
                  was solely created for educational purposes.
                </Typography>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Careers;
