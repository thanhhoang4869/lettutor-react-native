import api from 'utils/api';

async function fetchCourses(pagingOptions: any) {
  const response = await api.get('/course', {
    params: pagingOptions,
  });

  return response;
}

async function fetchCourseById(id: string) {
  const response = await api.get(`/course/${id}`);

  return response;
}

async function fetchCourseCategories() {
  const response = await api.get('/content-category');

  return response;
}

const courseService = {
  fetchCourses,
  fetchCourseById,
  fetchCourseCategories,
};

export default courseService;
