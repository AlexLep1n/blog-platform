import { Controller, useForm } from 'react-hook-form';
import FormField from '../../../components/ui/FormField/FormField';
import classes from './SignUp.module.css';
import SubmitButton from '../../../components/ui/SubmitButton/SubmitButton';
import Checkbox from 'antd/es/checkbox/Checkbox';
import { Link } from 'react-router-dom';
import { useSignUpUserMutation } from '../api';
import { useState } from 'react';

export default function SignUp() {
  const {
    control,
    reset,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      // username: 'alex',
      // email: 'alex@mail.ru',
      // password: '123456',
      // repeatPassword: '123456',
      checkbox: true,
    },
  });

  const [serverError, setServerError] = useState({});

  const [signUpUser] = useSignUpUserMutation();

  const onSubmit = async (userData) => {
    try {
      await signUpUser(userData).unwrap();
      reset();
    } catch (error) {
      setServerError({
        username: error?.data.errors.username,
        email: error?.data.errors.email,
      });
      console.log(`Failed to sign up with error: ${error?.data.errors}`);
    }
  };

  const password = watch('password');

  return (
    <section className={classes['sign-up']}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes['sign-up__form']}>
        <h2 className={classes['sign-up__title']}>Create new account</h2>
        <div className={classes['sign-up__inputs']}>
          <FormField
            control={control}
            name="username"
            serverError={serverError}
            clearError={() => setServerError((prev) => ({ ...prev, username: '' }))}
            rules={{
              required: 'You should enter your username.',
              minLength: {
                value: 3,
                message: 'Your username needs to be at least 3 characters.',
              },
              maxLength: {
                value: 20,
                message: 'Your username must not exceed 20 characters in length.',
              },
            }}
            placeholder="Username"
          >
            Username
          </FormField>
          <FormField
            control={control}
            name="email"
            serverError={serverError}
            clearError={() => setServerError((prev) => ({ ...prev, email: '' }))}
            rules={{
              required: 'You should enter your email address.',
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
            type="password"
            serverError={serverError}
            rules={{
              required: true,
              minLength: {
                value: 6,
                message: 'Your password needs to be at least 6 characters.',
              },
              maxLength: {
                value: 40,
                message: 'Your password must not exceed 40 characters in length.',
              },
            }}
            placeholder="Password"
          >
            Password
          </FormField>
          <FormField
            control={control}
            name="repeatPassword"
            type="password"
            rules={{
              required: 'You should enter your email password.',
              minLength: {
                value: 6,
                message: 'Your password needs to be at least 6 characters.',
              },
              maxLength: {
                value: 40,
                message: 'Your password must not exceed 40 characters in length.',
              },
              validate: (fieldValue) => fieldValue === password || 'Passwords must match.',
            }}
            placeholder="Password"
          >
            Repeat Password
          </FormField>
        </div>
        <div>
          <label className={classes['sign-up__personal-info']}>
            <Controller
              control={control}
              name="checkbox"
              rules={{
                required: 'You must agree to the processing of the data.',
              }}
              render={({ field: { onChange, value } }) => (
                <Checkbox
                  onChange={(e) => {
                    onChange(e.target.checked);
                  }}
                  checked={value}
                />
              )}
            />
            I agree to the processing of my personal information
          </label>
          {errors['checkbox'] && <p className={classes.error}>{errors['checkbox'].message}</p>}
        </div>
        <div className={classes['sign-up__submit-box']}>
          <SubmitButton disabled={!isValid}>Login</SubmitButton>
          <p className={classes['sign-up__question']}>
            Already have an account?
            <Link to={'/sign-in'} className={classes['sign-up__question-link']}>
              Sign In.
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}
