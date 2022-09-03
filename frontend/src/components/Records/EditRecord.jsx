import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useParams, useHistory, Link } from 'react-router-dom';
import * as yup from 'yup';
import axios from 'axios';

import routes from '../../routes.js';
import { actions as recordsActions } from '../../slices/recordsSlice.js';

const getValidationSchema = () => yup.object().shape({});

const EditRecord = () => {
  const { t } = useTranslation();
  const [record, setRecord] = useState(null);
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

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

  const f = useFormik({
    enableReinitialize: true,
    initialValues: {
      customerName: record ? record.customerName : '',
      phoneNumber: record ? record.phoneNumber : '',
    },
    validationSchema: getValidationSchema(),
    onSubmit: async (recordData, { setSubmitting, setErrors }) => {
        const requestRecord = {
          customerName: recordData.customerName,
          phoneNumber: recordData.phoneNumber,
        };
        const { data } = await axios.put(routes.edit(params.recordId), requestRecord);
        dispatch(recordsActions.updateRecord(data));
        const from = { pathname: routes.recordsPagePath() };
        history.push(from);
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  if (!record) {
    return null;
  }

  return (
    <>
      <h2 className="my-4">{t('recordEditing')}</h2>
      <Form onSubmit={f.handleSubmit}>
        <Form.Group className="mb-3" style={{ width: '500px' }}>
          <Form.Label htmlFor="customerName">{t('typeCustomerName')}</Form.Label>
          <Form.Control
            type="text"
            value={f.values.customerName}
            disabled={f.isSubmitting}
            onChange={f.handleChange}
            onBlur={f.handleBlur}
            id="customerName"
            name="customerName"
          />
        </Form.Group>
        <Form.Group className="mb-3" style={{ width: '500px' }}>
          <Form.Label htmlFor="phoneNumber">{t('typePhoneNumber')}</Form.Label>
          <Form.Control
            type="text"
            value={f.values.phoneNumber}
            disabled={f.isSubmitting}
            onChange={f.handleChange}
            onBlur={f.handleBlur}
            id="phoneNumber"
            name="phoneNumber"
          />
        </Form.Group>
        <Button variant="success" type="submit" style={{ width: '100px', height: '50px' }}>
          {t('edit')}
        </Button>
        <Button variant="primary" style={{ width: '100px', height: '50px', marginLeft: '300px' }}>
          <Link className="nav-link text-white" to={routes.recordPagePath(record.id)}>
            {t('goBack')}
          </Link>
        </Button>
      </Form>
    </>
  );
};

export default EditRecord;
