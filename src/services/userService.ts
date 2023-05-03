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

async function fetchUserInfo() {
  const response = await api.get('/user/info');
  return response;
}

async function updateProfile(user: any) {
  const response = await api.put('/user/info', {
    ...user,
  });

  return response;
}

const userService = {
  forgotPassword,
  manageFavoriteTutor,
  fetchUserInfo,
  updateProfile,
};

export default userService;
