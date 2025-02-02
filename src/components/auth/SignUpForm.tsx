import { useAuthenticator, Authenticator, CheckboxField, TextField } from '@aws-amplify/ui-react';

const SignUpForm = () => {
  const { validationErrors } = useAuthenticator();

  return (
    <>
      {/* Re-use default `Authenticator.SignUp.FormFields` */}
      <Authenticator.SignUp.FormFields />

      <TextField 
        errorMessage={validationErrors.test as string}
        hasError={!!validationErrors.test}
        name="test"
        label="This is a test text field"
      />

      {/* Append & require Terms and Conditions field to sign up  */}
      <CheckboxField
        errorMessage={validationErrors.acknowledgement as string}
        hasError={!!validationErrors.acknowledgement}
        name="acknowledgement"
        value="yes"
        label="I agree with the Terms and Conditions"
      />
    </>
  );
};

export default SignUpForm;