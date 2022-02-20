import { FC } from 'react';
import classNames from 'classnames';

import styles from './card.module.scss';

interface CardProps {
  className?: string;
}

export const Card: FC<CardProps> = ({ className, children }) => (
  <div className={classNames(styles.container, className)}>{children}</div>
);
