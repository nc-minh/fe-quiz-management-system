import createApiRequest from "../index";

export const getAll = () => {
  const result = createApiRequest({
    url: "/v1/user-answers",
    method: "GET",
  });
  return result;
};

export const getOne = (data) => {
  const result = createApiRequest({
    url: `/v1/user-answers/get-one`,
    method: "POST",
    data,
  });
  return result;
};

export const add = (data) => {
  const result = createApiRequest({
    url: "/v1/user-answers",
    method: "POST",
    data,
  });
  return result;
};

export const update = (id, data) => {
  const result = createApiRequest({
    url: `/v1/user-answers/${id}`,
    method: "PUT",
    data,
  });
  return result;
};

export const remove = (id) => {
  const result = createApiRequest({
    url: `/v1/user-answers${id}`,
    method: "DELETE",
  });
  return result;
};
