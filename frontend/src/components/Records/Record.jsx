import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, useHistory, useParams } from 'react-router-dom';
import {
  Card, Container, Form, Row, Col, Button,
} from 'react-bootstrap';
import axios from 'axios';

import routes from '../../routes.js';

const Record = () => {
  const { t } = useTranslation();
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [record, setRecord] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: recordData } = await axios.get(routes.record(params.recordId));
        setRecord(recordData);
      } catch (e) {
        setRecord(null);
      }
    };
    fetchData();
  }, [dispatch]);

  const removeRecord = async (event, id) => {
    event.preventDefault();
    try {
      await axios.delete(routes.delete(id));
      const from = { pathname: routes.recordsPagePath() };
      history.push(from);
    } catch (e) {
      const from = { pathname: routes.homePagePath() };
      history.push(from);
    }
  };

  if (!record) {
    return null;
  }

  return (
    <>
      <Card style={{ width: '650px' }}>
        <Card.Header>
          <Card.Title>
            {t('customerCard')}
            {record.customerName}
          </Card.Title>
        </Card.Header>
        <Card.Body>
          <Container>
            <Row>
              <Col>
                {t('phoneNumber')}
              </Col>
              <Col>
                {record.phoneNumber}
              </Col>
            </Row>
            <Row>
              <Col>
                {t('lastDate')}
              </Col>
              <Col>
                {new Date(record.timestamp).toLocaleString('ru')}
              </Col>
            </Row>
            <Button variant="primary" style={{ width: '200px', height: '50px', marginTop: '10px' }}>
              <Link className="nav-link text-white" to={routes.editRecord(record.id)}>
                {t('editRecord')}
              </Link>
            </Button>
            <Form onSubmit={(event) => removeRecord(event, record.id)}>
              <Button type="submit" variant="danger" style={{ width: '200px', height: '50px', marginTop: '10px' }}>{t('delete')}</Button>
            </Form>
          </Container>
        </Card.Body>
      </Card>
      <br />
      <Button variant="secondary" className="btn-sm" style={{ width: '650px' }}>
        <Link className="nav-link text-white" to={routes.recordsPagePath()}>
          {t('toCustomers')}
        </Link>
      </Button>
    </>
  );
};

export default Record;
