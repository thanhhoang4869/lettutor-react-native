import api from 'utils/api';

async function forgotPassword(email: string) {
  const response = await api.post('/user/forgotPassword', {
    email,
  });

  return response;
}

async function manageFavoriteTutor(options: any) {
  const response = await api.post('/user/manageFavoriteTutor', {
    ...options,
  });

  return response;
}

const userService = {
  forgotPassword,
  manageFavoriteTutor,
};

export default userService;
