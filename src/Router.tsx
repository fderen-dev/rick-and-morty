import { Route, Routes as ReactRouterRoutes } from 'react-router-dom';

import { CharactersPage } from 'pages/Characters/Characters';

import { Routes } from 'utils/constants';

export const Router = () => (
  <ReactRouterRoutes>
    {/* <Route path={Routes.Home} element={<HomePage />} /> */}
    <Route path={Routes.Home} element={<CharactersPage />} />
  </ReactRouterRoutes>
);
