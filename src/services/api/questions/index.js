
import createApiRequest from '../index';

export const getAll = (params) => {
  const result = createApiRequest({
    url: `/v1/questions`,
    method: 'GET',
    params,
  });
  return result;
};

export const getOne = (id) => {
  const result = createApiRequest({
    url: `/v1/questions/${id}`,
    method: 'GET',
  });
  return result;
};

export const getQuantityOfQuestions = () => {
  const result = createApiRequest({
    url: `/v1/questions/quantity`,
    method: "GET",
  });
  return result;
};

export const countQuestions = () => {
  const result = createApiRequest({
    url: `/v1/questions/counter`,
    method: "GET",
  });
  return result;
};

export const add = (data) => {
  const result = createApiRequest({
    url: '/v1/questions',
    method: 'POST',
    data,
  });
  return result;
};

export const update = (id, data) => {
  const result = createApiRequest({
    url: `/v1/questions/${id}`,
    method: "PUT",
    data,
  });
  return result;
};

export const remove = (id) => {
  const result = createApiRequest({
    url: `/v1/questions/${id}`,
    method: 'DELETE',
  });
  return result;
};
