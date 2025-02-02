import { 
  Box, 
  TextField, 
  Button, 
} from '@mui/material';
import { signUp } from 'aws-amplify/auth';
import React, { useState } from 'react';
  
  type Prop = {
    toggleMode: () => void
  };
  
const RegisterForm = ({ toggleMode }: Prop) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [passwordStrengthCheck, setPasswordStrengthCheck] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
      
  const validatePassword = (password: string) => {
    // Basic validation: at least 8 characters, 1 uppercase letter, 1 number
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return strongPasswordRegex.test(password);
  };
        
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const { email, password } = formData;
      setPasswordStrengthCheck(validatePassword(password));

      if (passwordStrengthCheck) {
        await signUp({
          username: email,
          password: password,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
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
  
export default RegisterForm;