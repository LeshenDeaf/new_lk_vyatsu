import Image from 'next/image';
import { FC, memo } from 'react';
import styles from './Card.module.scss';

interface IProps {
  text: string;
  image: {
    src: string;
    alt: string;
  }
}

const Card: FC<IProps> = ({text, image}) => {
	return (
		<div className={styles.link_block}>
			<div className={styles.link_text}>{text}</div>
			<div className={styles.image}>
				<Image src={image.src} alt={image.alt} width="80" height="80" />
			</div>
		</div>
	);
};

export default memo(Card);
