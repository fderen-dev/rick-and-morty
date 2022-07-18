import { ComponentProps, FC } from 'react';
import classNames from 'classnames/bind';

import styles from './button.module.scss';

const cx = classNames.bind(styles);

export enum Variants {
  RAW = 'raw',
  PRIMARY = 'primary',
}

interface Props extends ComponentProps<'button'> {
  variant?: Variants;
  text?: string;
  className?: string;
}

export const Button: FC<Props> = ({
  text,
  variant = 'primary',
  children,
  className,
  type = 'button',
  ...baseProps
}) => (
  <button
    type={type}
    {...baseProps}
    className={cx(styles.button, variant, className)}
  >
    <>
      {text && <span>{text}</span>}
      {children}
    </>
  </button>
);
