import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { selectors } from '../slices/notificationSlice.js';

const Notification = () => {
  const messages = useSelector(selectors.selectAll);
  const { t } = useTranslation();

  return (
    <>
      {messages.map((message) => (
        <Alert key={message.id} show variant={message.type} style={{ marginTop: '20px'} }>
          {t(message.text)}
        </Alert>
      ))}
    </>
  );
};

export default Notification;
