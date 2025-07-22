// Components
import Image from 'next/image';
import { Tag } from '@/Components/Home/tags/tag';

// Image
import HeroImage from '../..//public/imagens/hero.png'

// Css style
import style from './page.module.css'

export default function Home() {
  return (
    <section className={style.home}>
      <article className={style.content}>
        <Image 
          className={style.imageArticle}
          src={HeroImage} 
          alt="Imagem de ilustração de um sistema de tarefas" 
          width={300}
          height={200}
        />

        <h2 className={style.description}>
          Sistemas feito para você organizar
          <span className={style.descriptionSpan}> seus estudos e tarefas</span>
        </h2>

        <section className={style.tagsContainer}>
          <Tag>+ 7 mil posts</Tag>
          <Tag>+ 1 mil comentários</Tag>
        </section>
      </article>
    </section>
  );
}
