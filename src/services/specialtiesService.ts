import api from 'utils/api';

async function fetchLearnTopics() {
  const response = await api.get('/learn-topic');
  return response;
}

async function fetchTestPreps() {
  const response = await api.get('/test-preparation');
  return response;
}

async function fetchMajors() {
  const response = await api.get('/major');
  return response;
}

const specialtiesService = {
  fetchLearnTopics,
  fetchTestPreps,
  fetchMajors,
};

export default specialtiesService;
