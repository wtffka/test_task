import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import routes from '../routes.js';

const Welcome = () => {
    const { t } = useTranslation();
    return (
        <Card style={{ marginTop: '100px' }}>
            <Card.Body className="p-5 bg-dark text-light">
                <div className="display-4">{t('phonebook')}</div>
                <hr />
                <Button variant="primary">
                    <Link className="nav-link text-white" to={routes.recordsPagePath()}>
                        {t('toPhonebook')}
                    </Link>
                </Button>
            </Card.Body>
        </Card>
    );
};

export default Welcome;