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

const scheduleService = {
  bookSchedule,
  cancelSchedule,
};

export default scheduleService;
