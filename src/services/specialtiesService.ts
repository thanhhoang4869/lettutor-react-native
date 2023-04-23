import api from 'utils/api';

async function fetchLearnTopics() {
  const response = await api.get('/learn-topic');
  return response;
}

async function fetchTestPreps() {
  const response = await api.get('/test-preparation');
  return response;
}

const specialtiesService = {
  fetchLearnTopics,
  fetchTestPreps,
};

export default specialtiesService;
