import api from 'utils/api';

async function forgotPassword(email: string) {
  const response = await api.post('/user/forgotPassword', {
    email,
  });

  return response;
}

const userService = {
  forgotPassword,
};

export default userService;
