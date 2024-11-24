import classes from './ArticleForm.module.css';
import FormField from '../../ui/FormField/FormField';
import Tags from '../../parts/Tags/Tags';
import SubmitButton from '../../ui/SubmitButton/SubmitButton';
import { Control, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';

interface FormData {
  title: string;
  description: string;
  body: string;
  tags: { id: string; value: string }[];
}

interface ArticleFormProps {
  serverError?: Record<string, string>;
  setServerError: (error: Record<string, string>) => void;
  isEdited: boolean;
  isValid: boolean;
  handleSubmit: UseFormHandleSubmit<FormData>;
  onSubmit: SubmitHandler<FormData>;
  control: Control<FormData>;
}

export default function ArticleForm({
  handleSubmit,
  onSubmit,
  control,
  serverError,
  setServerError,
  isEdited,
  isValid,
}: ArticleFormProps) {
  return (
    <section className={classes['article-form']}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes['article-form__form']}>
        <h2 className={classes['article-form__title']}>
          {isEdited ? 'Edit article' : 'Create new article'}
        </h2>
        <div className={classes['article-form__inputs']}>
          <FormField<FormData>
            control={control}
            name="title"
            rules={{
              required: 'Title field cannot be empty.',
            }}
            placeholder="Title"
          >
            Title
          </FormField>
          <FormField<FormData>
            control={control}
            name="description"
            rules={{
              required: 'Short description field cannot be empty.',
            }}
            placeholder="Short description"
          >
            Short description
          </FormField>
          <FormField<FormData>
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
          <Tags<FormData> control={control} name="tags" />
        </div>
        <SubmitButton btnClass={classes['article-form__submit-btn']} disabled={!isValid}>
          Save
        </SubmitButton>
      </form>
    </section>
  );
}
