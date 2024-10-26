import classes from './Articles.module.css';
import Article from '../Article/Article';
import { useGetArticlesQuery } from '../api';

export default function Articles() {
  const { data: articles } = useGetArticlesQuery();
  console.log(articles);

  return (
    <section className={classes.users}>
      <Article />
    </section>
  );
}
