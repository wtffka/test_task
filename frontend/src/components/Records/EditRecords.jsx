import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { selectors, actions as recordsActions } from '../../slices/recordsSlice.js';
import routes from '../../routes.js';

const EditRecords = () => {
  const { t } = useTranslation();

  const history = useHistory();
  const dispatch = useDispatch();

  const records = useSelector(selectors.selectAll);

  const updateRecords = async (event) => {
    event.preventDefault();
    try {
      await axios.put(routes.editAll());
      dispatch(recordsActions.updateRecords(records));
      const from = { pathname: routes.recordsPagePath() };
      history.push(from);
    } catch (e) {
      const from = { pathname: routes.recordsPagePath() };
      history.push(from);
    }
  };

  return (
    <>
      <h2 className="my-4">{t('changeFormatNumber')}</h2>
      <Form onSubmit={(event) => updateRecords(event)}>
        <Button type="submit" variant="success" style={{ width: '130px', height: '50px' }}>{t('confirm')}</Button>
      </Form>
      <Button variant="secondary" style={{ width: '130px', height: '50px', marginTop: '10px' }}>
        <Link className="nav-link text-white" to={routes.recordsPagePath()}>
          {t('goBack')}
        </Link>
      </Button>
    </>
  );
};

export default EditRecords;
