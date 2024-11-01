import { useForm } from 'react-hook-form';
import FormField from '../../../components/ui/FormField/FormField';
import SubmitButton from '../../../components/ui/SubmitButton/SubmitButton';
import classes from './SignIn.module.css';

export default function SignIn() {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    mode: 'onSubmit',
  });

  function onSubmit(data) {
    console.log(data);
    reset();
  }

  return (
    <section className={classes['sign-in']}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes['sign-in__form']}>
        <h2 className={classes['sign-in__title']}>Sign In</h2>
        <div className={classes['sign-in__inputs']}>
          <FormField
            control={control}
            name="email"
            rules={{
              required: 'Login is invalid. Please try again.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+.[^\s@]+$/,
                message: 'Enter a valid email address',
              },
            }}
            errors={errors}
            placeholder="Email address"
          >
            Email address
          </FormField>
          <FormField
            control={control}
            name="password"
            rules={{
              required: 'Password is invalid. Please try again.',
              minLength: {
                value: 6,
                message: 'Your password is too short.',
              },
            }}
            errors={errors}
            placeholder="Password"
          >
            Password
          </FormField>
        </div>
        <SubmitButton>Login</SubmitButton>
      </form>
    </section>
  );
}
