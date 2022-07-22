
import createApiRequest from '../index';

export const getAll = () => {
  const result = createApiRequest({
    url: '/v1/topics',
    method: 'GET',
  });
  return result;
};

export const getOne = (name) => {
  const result = createApiRequest({
    url: `/v1/topics/${name}`,
    method: 'GET',
  });
  return result;
};

export const countTopics = () => {
  const result = createApiRequest({
    url: `/v1/topics/counter`,
    method: "GET",
  });
  return result;
};

export const add = (data) => {
  const result = createApiRequest({
    url: '/v1/topics',
    method: 'POST',
    data,
  });
  return result;
};

export const updateTopic = (id, data) => {
  const result = createApiRequest({
    url: `/v1/topics/${id}`,
    method: "PUT",
    data,
  });
  return result;
};

export const remove = (id) => {
  const result = createApiRequest({
    url: `/v1/topics/${id}`,
    method: 'DELETE',
  });
  return result;
};
