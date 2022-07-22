import createApiRequest from '../index';

export const getAll = () => {
  const result = createApiRequest({
    url: '/v1/answers',
    method: 'GET',
  });
  return result;
};

export const getOne = (id) => {
  const result = createApiRequest({
    url: `/v1/answers${id}`,
    method: 'GET',
  });
  return result;
};

export const add = (data) => {
  const result = createApiRequest({
    url: '/v1/answers',
    method: 'POST',
    data,
  });
  return result;
};

export const update = (id) => {
  const result = createApiRequest({
    url: `/v1/answers${id}`,
    method: 'PUT',
  });
  return result;
};

export const removeAnswer = (id) => {
  const result = createApiRequest({
    url: `/v1/answers/${id}`,
    method: 'DELETE',
  });
  return result;
};
