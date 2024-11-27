import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import { IArticleFunc } from './useArticleForm';
import { IArticle } from '../modules/articles/article-interface';

interface Tag {
  id: string;
  value: string;
}

interface IArticleFormData {
  title: string;
  description: string;
  body: string;
  tags: Tag[];
}

interface IOnSubmit {
  (formData: IArticleFormData): Promise<void>;
}

interface iUseArticleFormLogic {
  (
    article: IArticle | null,
    handleSubmitCallBack: IArticleFunc
  ): {
    control: Control<IArticleFormData>;
    handleSubmit: (onSubmit: IOnSubmit) => (e?: React.BaseSyntheticEvent) => Promise<void>;
    onSubmit: IOnSubmit;
    isValid: boolean;
    serverError: Record<string, string[]>;
    setServerError: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
  };
}

type ServerErrorType = { errors: Record<string, string[]> };

function isError(error: unknown): error is ServerErrorType {
  if (
    typeof error === 'object' &&
    error !== null &&
    'errors' in error &&
    typeof error.errors === 'object' &&
    Object.values((error as ServerErrorType).errors).every(
      (errorArray) =>
        Array.isArray(errorArray) && errorArray.every((errorItem) => typeof errorItem === 'string')
    )
  ) {
    return true;
  }
  return false;
}

export const useArticleFormLogic: iUseArticleFormLogic = (article, handleSubmitCallBack) => {
  const [serverError, setServerError] = useState({});

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm<IArticleFormData>({ mode: 'onChange' });

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

  const onSubmit = async (formData: IArticleFormData) => {
    const { title, description, body, tags } = formData;
    const tagsValues = tags.map((tag) => tag.value);
    const formattedArticleData = {
      title,
      description,
      body,
      tagList: tagsValues,
    };

    try {
      handleSubmitCallBack(formattedArticleData);
      if (!article) {
        reset({ title: '', description: '', body: '', tags: [] });
      }
    } catch (error: unknown) {
      if (isError(error)) {
        setServerError(error.errors);
      } else {
        setServerError({});
      }
    }
  };

  return { control, handleSubmit, onSubmit, isValid, serverError, setServerError };
};
