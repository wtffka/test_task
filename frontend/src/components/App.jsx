import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from '../routes.js';

import NewRecord from './Records/NewRecord.jsx';
import Notification from './Notification.jsx';
import Records from './Records/Records.jsx';
import Record from './Records/Record.jsx';
import EditRecord from './Records/EditRecord.jsx';
import Welcome from "./Welcome.jsx";

const App = () => {
  return (
    <>
      <div className="container wrapper flex-grow-1">
        <Notification />
        <h1 className="my-4">{null}</h1>
        <Switch>
          <Route exact path={routes.homePagePath()} component={Welcome} />

          <Route exact path={routes.recordsPagePath()}><Records /></Route>

          <Route exact path={routes.recordPagePath(':recordId')}><Record /></Route>

          <Route exact path={routes.addRecord()}><NewRecord /></Route>

          <Route exact path={routes.editRecord(':recordId')}><EditRecord /></Route>

        </Switch>
      </div>
      <footer>
        <div className="border-top text-center bg-dark">
          <a rel="noreferrer" className="text-white" href="https://t.me/wtffka">Created by Vyacheslav Balakhonov</a>
        </div>
      </footer>
    </>
  );
};

export default App;
