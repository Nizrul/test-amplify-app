import { 
  Box, 
  TextField, 
  Button, 
} from '@mui/material';
import { signIn } from 'aws-amplify/auth';
import React, { useState } from 'react';

type Prop = {
  toggleMode: () => void
};

const SignInForm = ({ toggleMode }: Prop) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {

    try {
      e.preventDefault();
      const { email, password } = formData;
      await signIn({
        username: email,
        password: password,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={(handleSignIn)}>
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
          Sign In
        </Button>
        <Button 
          variant="text" 
          color="secondary" 
          onClick={toggleMode}
          fullWidth
        >
          Don't have an account? Register
        </Button>
      </Box>
    </form>
  );
};

export default SignInForm;