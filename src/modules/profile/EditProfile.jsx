import { useForm } from 'react-hook-form';
import classes from './EditProfile.module.css';
import FormField from '../../components/ui/FormField/FormField';
import { useGetCurrentUserQuery, useUpdateCurrentUserMutation } from './api';
import { Alert, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import SubmitButton from '../../components/ui/SubmitButton/SubmitButton';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { skipToken } from '@reduxjs/toolkit/query';

export default function EditProfile() {
  const token = localStorage.getItem('token');

  const {
    data: { user } = {},
    isLoading,
    isSuccess,
    isError,
  } = useGetCurrentUserQuery(token || skipToken);
  const [updateUser, { isError: isServerError }] = useUpdateCurrentUserMutation();

  const navigate = useNavigate();
  const [serverError, setServerError] = useState({});

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: user?.username,
      email: user?.email,
    },
  });

  useEffect(() => {
    if (user && isSuccess && !isServerError) {
      reset({ username: user.username, email: user.email });
    }
  }, [reset, user, isSuccess, isServerError]);

  const onSubmit = async (editUserData) => {
    try {
      const { user } = await updateUser(editUserData).unwrap();
      reset({ username: user.username, email: user.email });
      navigate('/profile');
    } catch (error) {
      reset({ username: editUserData.username, email: editUserData.email });
      console.log('ОШИБКА: ', error.data.errors);
      setServerError({
        username: error?.data.errors.username,
        email: error?.data.errors.email,
      });
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
                serverError={serverError}
                clearError={() => setServerError((prev) => ({ ...prev, username: '' }))}
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
                      /^[A-Za-zА-Яа-яЁё0-9]+(-[A-Za-zА-Яа-яЁё0-9]+)?( [A-Za-zА-Яа-яЁё0-9]+(-[A-Za-zА-Яа-яЁё0-9]+)?)?$/,
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
                serverError={serverError}
                clearError={() => setServerError((prev) => ({ ...prev, email: '' }))}
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
