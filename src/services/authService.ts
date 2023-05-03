import api from 'utils/api';

async function login(data: any) {
  const response = await api.post('/auth/login', {
    email: data.email,
    password: data.password,
  });

  return response;
}

async function register(data: any) {
  const response = await api.post('/auth/register', {
    email: data.email,
    password: data.password,
    source: null,
  });

  return response;
}

const authService = {
  login,
  register,
};

export default authService;
