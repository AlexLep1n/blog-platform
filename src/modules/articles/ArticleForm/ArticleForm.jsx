import { useForm } from 'react-hook-form';
import FormField from '../../../components/ui/FormField/FormField';
import SubmitButton from '../../../components/ui/SubmitButton/SubmitButton';
import classes from './ArticleForm.module.css';
import Tags from '../../../components/parts/Tags/Tags';
import { useState } from 'react';
import { useCreateArticleMutation } from '../api';

export default function ArticleForm() {
  const [createArticle] = useCreateArticleMutation();
  const [serverError, setServerError] = useState({});

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (newArticleData) => {
    try {
      await createArticle(newArticleData).unwrap();
      reset();
    } catch (error) {
      setServerError(error?.errors);
    }
  };

  return (
    <section className={classes['article-form']}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes['article-form__form']}>
        <h2 className={classes['article-form__title']}>Create new article</h2>
        <div className={classes['article-form__inputs']}>
          <FormField
            control={control}
            name="title"
            rules={{
              required: 'Title field cannot be empty.',
            }}
            placeholder="Title"
          >
            Title
          </FormField>
          <FormField
            control={control}
            name="description"
            rules={{
              required: 'Short description field cannot be empty.',
            }}
            placeholder="Short description"
          >
            Short description
          </FormField>
          <FormField
            control={control}
            name="body"
            serverError={serverError}
            clearError={() => setServerError({})}
            rules={{
              required: 'Text field cannot be empty.',
            }}
            placeholder="Text"
            textArea={true}
          >
            Text
          </FormField>
          <Tags control={control} name="tags" />
        </div>
        <SubmitButton btnClass={classes['article-form__submit-btn']} disabled={!isValid}>
          Save
        </SubmitButton>
      </form>
    </section>
  );
}
