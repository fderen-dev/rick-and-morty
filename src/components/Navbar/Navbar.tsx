import { VFC } from 'react';

import styles from './navbar.module.scss';

interface NavbarProps {}

export const Navbar: VFC<NavbarProps> = (): JSX.Element => {
  return <div className={ styles.container }></div>
}