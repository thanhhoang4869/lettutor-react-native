import api from 'utils/api';

async function fetchTutorList(options: any) {
  const response = await api.post('/tutor/search', {
    ...options,
  });

  return response;
}

async function fetchTutorById(id: string) {
  const response = await api.get(`/tutor/${id}`);

  return response;
}

async function fetchTutorSchedule(params: ScheduleParams) {
  const response = await api.get('/schedule', {
    params,
  });

  return response;
}

const tutorService = {
  fetchTutorList,
  fetchTutorById,
  fetchTutorSchedule,
};

export interface ScheduleParams {
  tutorId: string;
  startTimestamp: number;
  endTimestamp: number;
}

export default tutorService;
