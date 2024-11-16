import classes from './ArticleForm.module.css';
import FormField from '../../ui/FormField/FormField';
import Tags from '../../parts/Tags/Tags';
import SubmitButton from '../../ui/SubmitButton/SubmitButton';
import PropTypes from 'prop-types';

export default function ArticleForm({
  handleSubmit,
  onSubmit,
  control,
  serverError,
  setServerError,
  isEdited,
  isValid,
}) {
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
  isValid: PropTypes.bool,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  control: PropTypes.elementType,
  serverError: PropTypes.object,
  setServerError: PropTypes.func,
};
