// @ts-check

import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import axios from 'axios';

import { selectors } from '../../slices/recordsSlice.js';

import routes from '../../routes.js';

const Records = () => {
  const { t } = useTranslation();

  // const history = useHistory();

  const records = useSelector(selectors.selectAll);

  // const updateRecords = async () => {
  //   try {
  //     await axios.put(routes.editAll());
  //   } catch (e) {
  //     const from = { pathname: routes.homePagePath() };
  //     history.push(from);
  //   }
  // };

  if (!records) {
    return null;
  }

  return (
    <>
      <Button variant="primary" className="btn-sm" style={{ height: '50px' }}>
        <Link className="nav-link text-white" to={routes.addRecord()}>
          {t('addRecord')}
        </Link>
      </Button>
      <Button variant="primary" className="btn-sm" style={{ marginLeft: '160px', height: '50px' }}>
        <Link className="nav-link text-white" to={routes.editRecords()}>
          {t('changeFormatNumber')}
        </Link>
      </Button>
      <Table>
        <thead>
          <tr>
            <th>{t('id')}</th>
            <th>{t('customerName')}</th>
            <th>{t('phoneNumber')}</th>
            <th>{t('lastDate')}</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.customerName}</td>
              <td>{record.phoneNumber}</td>
              <td>{new Date(record.timestamp).toLocaleString('ru')}</td>
              <td>
                <Button variant="secondary" className="btn-sm">
                  <Link className="nav-link text-white" to={routes.recordPagePath(record.id)}>
                    {t('viewRecord')}
                  </Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Records;