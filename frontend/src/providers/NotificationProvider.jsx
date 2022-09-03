import React, { useEffect } from 'react';
import {
  useHistory,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import { NotificationContext } from '../contexts/index.js';
import { actions as notifyActions } from '../slices/notificationSlice.js';

const NotificationProvider = ({ children }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const clean = () => dispatch(notifyActions.clean());

  const messageMapping = {
    info(text) {
      const messages = { id: _.uniqueId(), text, type: 'warning' };
      dispatch(notifyActions.addMessage(messages));
    },
  };

  useEffect(() => {
    history.listen((record) => {
      const { state } = record;
      if (!state) {
        dispatch(notifyActions.clean());
        return;
      }
      const { message, type } = state;
      if (!message) {
        dispatch(notifyActions.clean());
        return;
      }

      if (!type) {
        messageMapping.info(message);
        return;
      }

      messageMapping[type](message);
    });
  });

  return (
    <NotificationContext.Provider value={{
      addMessage: messageMapping.info,
      clean,
    }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
