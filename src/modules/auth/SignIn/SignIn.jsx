import { useForm } from 'react-hook-form';
import FormField from '../../../components/ui/FormField/FormField';
import SubmitButton from '../../../components/ui/SubmitButton/SubmitButton';
import classes from './SignIn.module.css';
import { useSignInUserMutation } from '../api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SignIn() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: localStorage.getItem('email'),
    },
  });

  const [signInErrors, setSignInErrors] = useState('');

  const navigate = useNavigate();

  async function onSubmit(loginUserData) {
    try {
      console.log(loginUserData);
      await signInUser(loginUserData).unwrap();
      reset();
      navigate('..', { relative: 'path' });
    } catch (error) {
      setSignInErrors(error.data.errors['email or password']);
    }
  }
  const [signInUser] = useSignInUserMutation();

  return (
    <section className={classes['sign-in']}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes['sign-in__form']}>
        <h2 className={classes['sign-in__title']}>Sign In</h2>
        <div className={classes['sign-in__inputs']}>
          <FormField
            control={control}
            name="email"
            signInErrors={signInErrors}
            rules={{
              required: 'Login is invalid. Please try again.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
            }}
            placeholder="Email address"
          >
            Email address
          </FormField>
          <FormField
            control={control}
            name="password"
            signInErrors={signInErrors}
            rules={{
              required: 'Password is invalid. Please try again.',
              minLength: {
                value: 6,
                message: 'Your password is too short.',
              },
            }}
            placeholder="Password"
          >
            Password
          </FormField>
        </div>
        <SubmitButton disabled={!isValid}>Login</SubmitButton>
      </form>
    </section>
  );
}
