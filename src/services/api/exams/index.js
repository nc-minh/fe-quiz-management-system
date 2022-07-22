import createApiRequest from "../index";

export const getAll = () => {
  const result = createApiRequest({
    url: "/v1/exams",
    method: "GET",
  });
  return result;
};

export const getOne = (id) => {
  const result = createApiRequest({
    url: `/v1/exams/${id}`,
    method: "GET",
  });
  return result;
};

export const countExams = () => {
  const result = createApiRequest({
    url: `/v1/exams/counter`,
    method: "GET",
  });
  return result;
};

export const add = (data) => {
  const result = createApiRequest({
    url: "/v1/exams",
    method: "POST",
    data,
  });
  return result;
};

export const update = (id, data) => {
  const result = createApiRequest({
    url: `/v1/exams/${id}`,
    method: "PUT",
    data,
  });
  return result;
};

export const remove = (id) => {
  const result = createApiRequest({
    url: `/v1/exams/${id}`,
    method: "DELETE",
  });
  return result;
};
