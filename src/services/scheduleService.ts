import api from 'utils/api';

async function bookSchedule(options: any) {
  const response = await api.post('/booking', {
    ...options,
  });

  return response;
}

async function cancelSchedule(options: any) {
  const response = await api.delete('/booking', {
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

async function fetchHistory(params: FetchHistoryParams) {
  const response = await api.get('/booking/list/student', {
    params,
  });

  return response;
}

async function getTotalStudyTime() {
  const response = await api.get('/call/total');

  return response;
}

export interface GetUpcomingLessonsParams {
  dateTime: number;
}

async function getUpcomingLessons(params: GetUpcomingLessonsParams) {
  const response = await api.get('/booking/next', {
    params,
  });

  return response;
}

const scheduleService = {
  bookSchedule,
  cancelSchedule,
  fetchSchedules,
  fetchHistory,
  getTotalStudyTime,
  getUpcomingLessons,
};

export default scheduleService;
