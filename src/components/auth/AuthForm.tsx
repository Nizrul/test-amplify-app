import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Grid, 
  Paper 
} from '@mui/material';

const AuthForm = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSignIn) {
      console.log('Sign In with:', formData);
    } else {
      console.log('Register with:', formData);
    }
  };

  const toggleMode = () => {
    setIsSignIn(!isSignIn);
    setFormData({ email: '', password: '' });
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: '2rem', borderRadius: '1rem' }}>
          <Typography variant="h5" align="center" gutterBottom>
            {isSignIn ? 'Sign In' : 'Register'}
          </Typography>
          <form onSubmit={(handleSubmit)}>
            <Box display="flex" flexDirection="column" gap="1rem">
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                fullWidth
                required
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                {isSignIn ? 'Sign In' : 'Register'}
              </Button>
              <Button 
                variant="text" 
                color="secondary" 
                onClick={toggleMode}
                fullWidth
              >
                {isSignIn ? 'Don\'t have an account? Register' : 'Already have an account? Sign In'}
              </Button>
            </Box>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AuthForm;
