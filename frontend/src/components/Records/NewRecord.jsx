// @ts-check

import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import { actions as recordActions } from '../../slices/recordsSlice.js';
import routes from '../../routes.js';

import { useNotify } from '../../hooks/index.js';

const getValidationSchema = () => yup.object().shape({});

const NewRecord = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const history = useHistory();
  const notify = useNotify();

  const f = useFormik({
    initialValues: {
      customerName: '',
      phoneNumber: '',
    },
    validationSchema: getValidationSchema(),
    onSubmit: async (recordData, { setSubmitting, setErrors }) => {
      try {
        const requestRecord = {
          customerName: recordData.customerName,
          phoneNumber: recordData.phoneNumber,
        };
        const { data } = await axios.post(routes.add(), requestRecord);
        dispatch(recordActions.addRecord(data));
        const from = { pathname: routes.recordsPagePath() };
        history.push(from);
      } catch (e) {
        setSubmitting(false);
        if (e.response?.status === 422 && Array.isArray(e.response?.data)) {
          const errors = e.response.data
            .reduce((acc, err) => ({ ...acc, [err.field]: err.defaultMessage }), {});
          setErrors(errors);
          notify.addError('addLocationError');
        }
      }
    },
    validateOnBlur: false,
    validateOnChange: false,
  });

  return (
    <>
      <h2 className="my-4">{t('recordAdding')}</h2>
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
        <Button variant="success" type="submit">
          {t('add')}
        </Button>
      </Form>
    </>
  );
};

export default NewRecord;
