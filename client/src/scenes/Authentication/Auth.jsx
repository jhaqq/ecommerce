import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { jsx } from '@emotion/react'
import { TextField, Button, Typography, Paper, Box } from '@mui/material';
import { shades } from '../../theme';
import { setShowAuth } from '../../state';

const formStyles = jsx`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  form {
    width: 100%;
    padding: 2rem;
    
  }
`;

const Auth = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const location = useLocation();
  const showAuth = useSelector((state) => state.cart.showAuth);
  
  useEffect(() =>  {
    if(location.pathname === '/auth') {
      dispatch(setShowAuth(true));
    }
  }, [location])

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    
  };

  return (
    <Box height='80vh' display='flex' justifyContent='center' alignItems='center'>
      <Box position='absolute' textAlign='center' sx={{ top: '10%', cursor: 'pointer' }} display='flex' onClick={() => {
        navigate('/');
        dispatch(setShowAuth(false));
      }
      }>
        <Typography variant='h2'>
          WELCOME TO <Typography variant='h2' color={shades.secondary[500]}>ECOMMER</Typography>
        </Typography>
      </Box>
      <div css={formStyles} style={{ margin: '30px 10px' }}>
        <Box width='100%'>
          <Paper elevation={3}>
            <Typography variant="h3" textAlign='center' sx={{ padding: '10px' }}>Sign In</Typography>
            <form onSubmit={handleSubmit} style={{ margin: '10px 10px' }}>
              <TextField
                id="email"
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                sx={{margin: "20px 0"}}
              >
                Sign In
              </Button>
            </form>
          </Paper>
        </Box>
      </div>
    </Box>
  );
};

export default Auth;