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

async function reportTutor(option: any) {
  const response = await api.post('/report', {
    ...option,
  });

  return response;
}

async function getReviewByTutorId(params: any) {
  const tutorId = params.tutorId;
  const page = params.page;
  const perPage = params.perPage;

  const response = await api.get(
    `/feedback/v2/${tutorId}?page=${page}&perPage=${perPage}`,
  );

  return response;
}

const tutorService = {
  fetchTutorList,
  fetchTutorById,
  fetchTutorSchedule,
  reportTutor,
  getReviewByTutorId,
};

export interface ScheduleParams {
  tutorId: string;
  startTimestamp: number;
  endTimestamp: number;
}

export default tutorService;
