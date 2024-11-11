import { useForm } from 'react-hook-form';
import FormField from '../../../components/ui/FormField/FormField';
import SubmitButton from '../../../components/ui/SubmitButton/SubmitButton';
import classes from './ArticleForm.module.css';
import Tags from '../../../components/parts/Tags/Tags';
import { useEffect, useMemo, useState } from 'react';
import { useCreateArticleMutation, useGetArticleInfoQuery, useUpdateArticleMutation } from '../api';
import { message } from 'antd';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

export default function ArticleForm({ isEdited }) {
  const [createArticle] = useCreateArticleMutation();
  const [updateArticle] = useUpdateArticleMutation();
  const { slug } = useParams();
  const { data } = useGetArticleInfoQuery(slug);
  const [serverError, setServerError] = useState({});

  const article = useMemo(() => data?.article || [], [data?.article]);

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    if (isEdited && data && article) {
      const { title, description, body, tagList } = article;
      reset({
        title,
        description,
        body,
        tags: tagList.map((tag) => ({
          id: nanoid(),
          value: tag,
        })),
      });
    }
  }, [isEdited, data, article, reset]);

  const onSubmit = async (formData) => {
    const { title, description, body, tags } = formData;
    const tagsValues = tags.map((tag) => tag.value);
    const formattedArticleData = { title, description, body, tagList: tagsValues };

    try {
      if (isEdited) {
        await updateArticle({ slug, articleData: formattedArticleData }).unwrap();
        reset(article);
      } else {
        await createArticle(formattedArticleData).unwrap();
        reset({ title: '', description: '', body: '', tags: [] });
      }
      message.success('Success');
    } catch (error) {
      setServerError(error?.errors);
    }
  };

  return (
    <section className={classes['article-form']}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes['article-form__form']}>
        <h2 className={classes['article-form__title']}>
          {isEdited ? 'Edit article' : 'Create new article'}
        </h2>
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

ArticleForm.propTypes = {
  isEdited: PropTypes.bool,
};
