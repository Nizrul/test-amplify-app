import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignUpForm from './components/auth/SignUpForm.tsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

Amplify.configure(outputs);

const queryClient = new QueryClient();

const authenticatorFormFields = {
  signUp: {
    phone_number: {
      dialCode: '+60'
    }
  }
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Authenticator 
      signUpAttributes={['address', 'phone_number']} 
      formFields={authenticatorFormFields}
      components={{
        SignUp: {
          FormFields: SignUpForm,
        }
      }}
    >
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
          <App />
        </LocalizationProvider>
      </QueryClientProvider>
    </Authenticator>
  </React.StrictMode>
);
