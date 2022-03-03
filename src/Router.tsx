import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import { CharactersPage } from 'pages/Characters/Characters';
import { HomePage } from 'pages/Home/Home';

import { Routes } from 'utils/constants';

export const Router = () => (
  <ReactRouterRoutes>
    <Route path={Routes.Home} element={<HomePage />} />
    <Route path={Routes.Characters} element={<CharactersPage />} />
  </ReactRouterRoutes>
);
