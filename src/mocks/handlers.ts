import { http, HttpResponse } from 'msw';

export const handlers = [
  // exemplo: GET /api/users
  http.get('/api/users', () =>
    HttpResponse.json([{ id: 1, name: 'Dev User' }]),
  ),

  // adicione outros endpoints mockados aqui
];