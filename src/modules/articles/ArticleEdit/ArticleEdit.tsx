import ArticleForm from '../../../components/blocks/ArticleForm/ArticleForm';
import { useParams } from 'react-router-dom';
import { useArticleForm } from '../../../hooks/useArticleForm';
import { useArticleFormLogic } from '../../../hooks/useArticleFormLogic';

export default function ArticleEdit() {
  const { slug } = useParams();

  if (!slug) {
    throw new Error('Slug is required to use this component.');
  }

  const { article, handleUpdateArticle } = useArticleForm(slug);

  const { control, handleSubmit, onSubmit, isValid, serverError, setServerError } =
    useArticleFormLogic(article, (formData) => handleUpdateArticle(slug, formData));

  return (
    <ArticleForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      isEdited={true}
      serverError={serverError}
      setServerError={setServerError}
      isValid={isValid}
    />
  );
}
