import createApiRequest from "../index";

export const getAll = () => {
  const result = createApiRequest({
    url: "/v1/user-exams",
    method: "GET",
  });
  return result;
};

export const getOne = (id) => {
  const result = createApiRequest({
    url: `/v1/user-exams/${id}`,
    method: "GET",
  });
  return result;
};

export const getAnsweredQuestions = (id) => {
  const result = createApiRequest({
    url: `/v1/user-exams/answered-questions/${id}`,
    method: "GET",
  });
  return result;
};

export const start = (id) => {
  const result = createApiRequest({
    url: `/v1/user-exams/start/${id}`,
    method: "PUT",
  });
  return result;
};

export const finish = (id) => {
  const result = createApiRequest({
    url: `/v1/user-exams/finish/${id}`,
    method: "PUT",
  });
  return result;
};
