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

export interface FetchSchedulesParams {
  page: number;
  perPage: number;
  dateTimeGte: number;
  orderBy: string;
  sortBy: string;
}

async function fetchSchedules(params: FetchSchedulesParams) {
  const response = await api.get('/booking/list/student', {
    params,
  });

  return response;
}

export interface FetchHistoryParams {
  page: number;
  perPage: number;
  dateTimeLte: number;
  orderBy: string;
  sortBy: string;
}

const userService = {
  forgotPassword,
  manageFavoriteTutor,
  fetchSchedules,
};

export default userService;
