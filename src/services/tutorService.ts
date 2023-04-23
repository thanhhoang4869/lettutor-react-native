import api from 'utils/api';

async function fetchTutorList(options: any) {
  const response = await api.post('/tutor/search', {
    ...options,
  });

  return response;
}

const tutorService = {
  fetchTutorList,
};

export default tutorService;
