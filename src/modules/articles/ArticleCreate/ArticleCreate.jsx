import { useParams } from 'react-router-dom';
import { useArticleForm } from '../../../hooks/useArticleForm';
import ArticleForm from '../../../components/blocks/ArticleForm/ArticleForm';
import { useArticleFormLogic } from '../../../hooks/useArticleFormLogic';

export default function ArticleCreate() {
  const { slug } = useParams();
  const { handleCreateArticle } = useArticleForm(slug);

  const { control, handleSubmit, onSubmit, isValid, serverError, setServerError } =
    useArticleFormLogic(null, (formData) => handleCreateArticle(formData));

  return (
    <ArticleForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      control={control}
      isEdited={false}
      serverError={serverError}
      setServerError={setServerError}
      isValid={isValid}
    />
  );
}
