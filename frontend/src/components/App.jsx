// @ts-check

import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import Notification from './Notification.jsx';

import Navbar from './Navbar.jsx';

import routes from '../routes.js';

import { actions as recordsActions } from '../slices/recordsSlice.js';

import { useNotify } from '../hooks/index.js';

import NewRecord from './Records/NewRecord.jsx';
import Records from './Records/Records.jsx';
import Record from './Records/Record.jsx';
import EditRecord from './Records/EditRecord.jsx';

const App = () => {
  const notify = useNotify();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const dataRoutes = [
      {
        name: 'locations',
        getData: async () => {
          const { data } = await axios.get(routes.records());
          if (!Array.isArray(data)) {
            notify.addError('Сервер не вернул список пользователей');
            dispatch(recordsActions.addRecords([]));
            return;
          }
          dispatch(recordsActions.addRecords(data));
        },
      },
    ];
    const promises = dataRoutes.map(({ getData }) => getData());
    Promise.all(promises)
      .finally(() => setLoading(false));
  });

  if (isLoading) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="container wrapper flex-grow-1">
        <Notification />
        <h1 className="my-4">{null}</h1>
        <Switch>

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
