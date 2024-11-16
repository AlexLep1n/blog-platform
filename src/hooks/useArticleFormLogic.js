import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export const useArticleFormLogic = (article, handleSubmitCallBack) => {
  const [serverError, setServerError] = useState({});

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({ mode: 'onChange' });

  useEffect(() => {
    if (article && Array.isArray(article.tagList)) {
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
  }, [article, reset]);

  const onSubmit = async (formData) => {
    const { title, description, body, tags } = formData;
    const tagsValues = tags.map((tag) => tag.value);
    const formattedArticleData = { title, description, body, tagList: tagsValues };

    try {
      handleSubmitCallBack(formattedArticleData);
      if (!article) {
        reset({ title: '', description: '', body: '', tags: [] });
      }
    } catch (error) {
      setServerError(error?.errors);
    }
  };

  return { control, handleSubmit, onSubmit, isValid, serverError, setServerError };
};
