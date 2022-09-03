import path from 'path';

const apiUrl = '/api';
const { host, protocol } = window.location;
const fullHost = `${protocol}//${host}`;

const buildUrl = (part) => () => {
  const urlPath = path.join(apiUrl, part);
  const url = new URL(urlPath, fullHost);
  return url.toString();
};

const buildLocalUrl = (part) => () => `/${part}`;

const routes = {
  homePagePath: buildLocalUrl(''),
  recordsPagePath: buildLocalUrl('api/records'),
  recordPagePath: (id) => `${buildLocalUrl('api/records')()}/${id}`,
  addRecord: () => `${buildLocalUrl('records')()}/new`,
  editRecord: (id) => `${buildLocalUrl('records')()}/${id}/edit`,

  records: buildUrl('records'),
  add: buildUrl('records'),
  editAll: buildUrl('records'),
  record: (id) => `${buildUrl('records')()}/${id}`,
  edit: (id) => `${buildUrl('records')()}/${id}`,
  delete: (id) => `${buildUrl('records')()}/${id}`,
};

export default routes;
