import { useForm } from 'react-hook-form';
import classes from './EditProfile.module.css';
import FormField from '../../components/ui/FormField/FormField';
import { useGetCurrentUserQuery, useUpdateCurrentUserMutation } from './api';
import { Alert, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import SubmitButton from '../../components/ui/SubmitButton/SubmitButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function EditProfile() {
  const { data: { user } = {}, isLoading, isSuccess, isError } = useGetCurrentUserQuery();
  const [updateUser] = useUpdateCurrentUserMutation();

  const storageUser = JSON.parse(localStorage.getItem('user'));

  const navigate = useNavigate();
  const [editError, setEditError] = useState({});
  console.log('USER', user);
  console.log('LS', storageUser);

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: user?.username || storageUser.username,
      email: user?.email || storageUser.email,
    },
  });

  const onSubmit = async (editUserData) => {
    try {
      const { user } = await updateUser(editUserData).unwrap();
      localStorage.setItem('user', JSON.stringify(user));
      reset({ username: user?.username, email: user?.email });
      navigate('/profile');
    } catch (error) {
      console.log('ОШИБКА: ', error.data.errors);
      setEditError(error.data.errors);
    }
  };
  return (
    <>
      <section className={classes['edit']}>
        {isError && (
          <Alert
            type="error"
            message="Error"
            description="Sorry, the user could not be uploaded. Please try again later."
            showIcon
          />
        )}
        {isLoading && <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />}
        {isSuccess && (
          <form onSubmit={handleSubmit(onSubmit)} className={classes['edit__form']}>
            <h2 className={classes['edit__title']}>Edit Profile</h2>
            <div className={classes['edit__inputs']}>
              <FormField
                control={control}
                name="username"
                editError={editError}
                rules={{
                  required: true,
                  minLength: {
                    value: 3,
                    message: 'Your username needs to be at least 3 characters.',
                  },
                  maxLength: {
                    value: 20,
                    message: 'Your username must not exceed 20 characters in length.',
                  },
                  pattern: {
                    value:
                      '/^[A-Za-zА-Яа-яЁё0-9]+(-[A-Za-zА-Яа-яЁё0-9]+)?( [A-Za-zА-Яа-яЁё0-9]+(-[A-Za-zА-Яа-яЁё0-9]+)?)?$/',
                    message: 'Your username is invalid.',
                  },
                }}
                placeholder="Username"
              >
                Username
              </FormField>
              <FormField
                control={control}
                name="email"
                editError={editError}
                rules={{
                  required: true,
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
                rules={{
                  required: 'The field cannot be empty.',
                  minLength: {
                    value: 6,
                    message: 'Your password needs to be at least 6 characters.',
                  },
                  maxLength: {
                    value: 40,
                    message: 'Your password must not exceed 40 characters in length.',
                  },
                }}
                placeholder="New password"
              >
                New password
              </FormField>
              <FormField
                control={control}
                name="image"
                rules={{
                  required: false,
                  pattern: {
                    value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|webp|svg))$/i,
                    message: 'Avatar image url is invalid.',
                  },
                }}
                placeholder="Avatar image"
              >
                Avatar image (url)
              </FormField>
            </div>
            <SubmitButton disabled={!isValid}>Save</SubmitButton>
          </form>
        )}
      </section>
    </>
  );
}
