import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import routes from '../../routes.js';

const EditRecords = () => {
  const { t } = useTranslation();

  const history = useHistory();

  const updateRecords = async () => {
    try {
      await axios.put(routes.editAll());
      const from = { pathname: routes.recordsPagePath() };
      history.push(from, { message: 'dataUpdated' });
    } catch (e) {
      const from = { pathname: routes.homePagePath() };
      history.push(from);
    }
  };

  return (
    <>
      <Button onClick={updateRecords} variant="primary" className="btn-sm" style={{ height: '50px' }}>
        {t('confirm')}
      </Button>
      <Button variant="primary" className="btn-sm" style={{ height: '50px', marginLeft: '160px' }}>
        <Link className="nav-link text-white" to={routes.homePagePath()}>
          {t('goBack')}
        </Link>
      </Button>
    </>
  );
};

export default EditRecords;
