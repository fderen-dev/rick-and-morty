import { FC } from 'react';
import { LinkProps, NavLink } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './navbarItem.module.scss';

const cx = classNames.bind(styles);
interface NavbarItemProps extends Pick<LinkProps, 'to'> {
  text?: string;
  className?: string;
  showActive?: boolean;
}

export const NavbarItem: FC<NavbarItemProps> = ({
  to,
  text,
  className,
  children,
  showActive = true
}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cx(styles.link, { isActive: isActive && showActive }, className)
      }
    >
      {text && <span className={styles.text}>{text}</span>}
      {children}
    </NavLink>
  );
};
