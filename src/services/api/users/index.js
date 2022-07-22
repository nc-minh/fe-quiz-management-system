import createApiRequest from "../index";

export const get = (headers) => {
  const result = createApiRequest({
    url: "/v1/users",
    method: "GET",
    headers,
  });
  return result;
};

export const countUsers = () => {
  const result = createApiRequest({
    url: `/v1/users/counter`,
    method: "GET",
  });
  return result;
};

export const add = (data) => {
  const result = createApiRequest({
    url: `/v1/users/`,
    method: "POST",
    data,
  });
  return result;
};

export const update = (id, data) => {
  const result = createApiRequest({
    url: `/v1/users/${id}`,
    method: "PUT",
    data,
  });
  return result;
};

export const remove = (id) => {
  const result = createApiRequest({
    url: `/v1/users/${id}`,
    method: "DELETE",
  });
  return result;
};
