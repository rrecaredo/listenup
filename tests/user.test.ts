import request from 'supertest';
import server from '../src/server';

describe('GET /users', () => {
    it('should return 200 OK', () => {
      return request(server).get('/users')
        .expect(200);
    });
  });
  