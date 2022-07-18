import { FC, FocusEvent, MouseEvent } from 'react';
import classNames from 'classnames';

import styles from './card.module.scss';

export interface CardProps {
  className?: string;
  onMouseOver?: (event: MouseEvent<HTMLDivElement>) => void;
  onMouseOverCapture?: (event: MouseEvent<HTMLDivElement>) => void;
  onFocus?: (event: FocusEvent<HTMLDivElement>) => void;
  onFocusCapture?: (event: FocusEvent<HTMLDivElement>) => void;
  onMouseOut?: (event: MouseEvent<HTMLDivElement>) => void;
  onMouseOutCapture?: (event: MouseEvent<HTMLDivElement>) => void;
  onBlur?: (event: FocusEvent<HTMLDivElement>) => void;
  onBlurCapture?: (event: FocusEvent<HTMLDivElement>) => void;
}

export const Card: FC<CardProps> = ({
  className,
  children,
  onMouseOver,
  onMouseOverCapture,
  onFocus,
  onFocusCapture,
  onMouseOut,
  onMouseOutCapture,
  onBlur,
  onBlurCapture,
}) => (
  <div
    onMouseOver={onMouseOver}
    onMouseOverCapture={onMouseOverCapture}
    onMouseOut={onMouseOut}
    onMouseOutCapture={onMouseOutCapture}
    onFocus={onFocus}
    onFocusCapture={onFocusCapture}
    onBlur={onBlur}
    onBlurCapture={onBlurCapture}
    className={classNames(styles.container, className)}
  >
    {children}
  </div>
);
