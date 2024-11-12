import { useForm } from 'react-hook-form';
import FormField from '../../../components/ui/FormField/FormField';
import SubmitButton from '../../../components/ui/SubmitButton/SubmitButton';
import classes from './ArticleForm.module.css';
import Tags from '../../../components/parts/Tags/Tags';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { useArticleForm } from '../../../hooks/useArticleForm';

export default function ArticleForm({ isEdited }) {
  const { slug } = useParams();
  const { article, handleCreateArticle, handleUpdateArticle } = useArticleForm(slug);
  const [serverError, setServerError] = useState({});

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    if (isEdited && article && Array.isArray(article.tagList)) {
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
  }, [isEdited, article, reset]);

  const onSubmit = async (formData) => {
    const { title, description, body, tags } = formData;
    const tagsValues = tags.map((tag) => tag.value);
    const formattedArticleData = { title, description, body, tagList: tagsValues };

    try {
      if (isEdited) {
        handleUpdateArticle(slug, formattedArticleData);
      } else {
        await handleCreateArticle(formattedArticleData);
        reset({ title: '', description: '', body: '', tags: [] });
      }
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
