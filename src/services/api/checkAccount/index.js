import createApiRequest from '../index';

export const checkLogin = () => {
    const result = createApiRequest({
        url: '/v1/infor',
        method: 'GET',
    });
    return result;
};

export const loginApi = (token_google) => {
  const result = createApiRequest({
    url: "/v1/login",
    method: "POST",
    token_google,
  });
  return result;
};

export const logoutApi = (data) => {
    const result = createApiRequest({
        url: '/v1/logout',
        method: 'POST',
        data,
    });
    return result;
};;