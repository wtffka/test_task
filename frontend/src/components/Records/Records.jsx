import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Button, Table } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import routes from '../../routes.js';

const Records = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: recordData } = await axios.get(routes.records());
      setData(recordData);
    };
    fetchData();
  }, [dispatch]);

  const updateRecords = async () => {
      await axios.put(routes.editAll());
      const {data: recordData} = await axios.get(routes.records());
      setData(recordData);
      const from = {pathname: routes.recordsPagePath()};
      history.push(from, {message: 'dataUpdated'});
  };

  if (!data) {
    return null;
  }

  return (
    <>
      <Button variant="primary" className="btn-sm" style={{ height: '50px' }}>
        <Link className="nav-link text-white" to={routes.addRecord()}>
          {t('addRecord')}
        </Link>
      </Button>
      <Button variant="primary" className="btn-sm" style={{ marginLeft: '160px', height: '50px' }} onClick={updateRecords}>
        {t('changeFormatNumber')}
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
          {data.map((record) => (
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
      <Button variant="secondary" className="btn-sm" style={{ width: '140px', height: '50px', float: 'left' }}>
        <Link className="nav-link text-white" to={routes.homePagePath()}>
          {t('welcomePage')}
        </Link>
      </Button>
    </>
  );
};

export default Records;
