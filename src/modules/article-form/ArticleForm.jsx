import { useForm } from 'react-hook-form';
import FormField from '../../components/ui/FormField/FormField';
import SubmitButton from '../../components/ui/SubmitButton/SubmitButton';
import classes from './ArticleForm.module.css';
import Tags from '../../components/parts/Tags/Tags';

export default function ArticleForm() {
  const {
    control,
    handleSubmit,
    formState: { isValid },
    // reset,
  } = useForm({ mode: 'onChange' });

  const onSubmit = (newArticleData) => {
    console.log(newArticleData);
  };

  return (
    <section className={classes['article-form']}>
      {/* {isError && (
      <Alert
        type="error"
        message="Error"
        description="Sorry, the user could not be uploaded. Please try again later."
        showIcon
      />
    )}
    {isLoading && <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />} */}
      <form onSubmit={handleSubmit(onSubmit)} className={classes['article-form__form']}>
        <h2 className={classes['article-form__title']}>Create new article</h2>
        <div className={classes['article-form__inputs']}>
          <FormField
            control={control}
            name="Title"
            // serverError={serverError}
            // clearError={() => setServerError((prev) => ({ ...prev, username: '' }))}
            rules={{
              required: 'Title field cannot be empty.',
            }}
            placeholder="Title"
          >
            Title
          </FormField>
          <FormField
            control={control}
            name="shortDescription"
            // serverError={serverError}
            // clearError={() => setServerError((prev) => ({ ...prev, email: '' }))}
            rules={{
              required: 'Short description field cannot be empty.',
            }}
            placeholder="Short description"
          >
            Short description
          </FormField>
          <FormField
            control={control}
            name="text"
            rules={{
              required: 'Text field cannot be empty.',
            }}
            placeholder="Text"
            textArea={true}
          >
            Text
          </FormField>
          <Tags />
        </div>
        <SubmitButton disabled={!isValid}>Save</SubmitButton>
      </form>
    </section>
  );
}
