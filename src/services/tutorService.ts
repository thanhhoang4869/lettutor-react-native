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

const tutorService = {
  fetchTutorList,
  fetchTutorById,
};

export default tutorService;
