import { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import classNames from 'classnames';

import styles from './navbarItem.module.scss';

interface NavbarItemProps extends Pick<LinkProps, 'to'> {
  text?: string;
  className?: string;
}

export const NavbarItem: FC<NavbarItemProps> = ({
  to,
  text,
  className,
  children
}) => {
  return (
    <Link
      to={to}
      className={classNames(
        styles.link,
        styles.hoverUnderlineAnimation,
        className
      )}
    >
      {text && <span className={styles.text}>{text}</span>}
      {children}
    </Link>
  );
};
