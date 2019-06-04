import request from 'supertest';
import server from '../src/server';
import toCamel from '../src/utils/toCamel';
import * as friendFakes from './fakes/friends.fake';
import * as playFakes from './fakes/plays.fake';

jest.mock('../src/services/friends');
jest.mock('../src/services/plays');

import { getFriends, getRelatedFriends } from '../src/services/friends';
import { getUserPlays } from '../src/services/plays';

(getFriends as any).mockReturnValue(Promise.resolve(friendFakes.allFriendsMock));

(getRelatedFriends as any).mockImplementation(
    (username: string) => Promise.resolve(friendFakes[`${toCamel(username)}Mock`]));

(getUserPlays as any).mockImplementation(
    (username: string) => {
        console.log(`${toCamel(username)}PlaysMock`);
        return Promise.resolve(playFakes[`${toCamel(username)}PlaysMock`])
    });

describe('GET /users', () => {
    it('should return 200 OK with a collection of Users', async () => {
        const result = await request(server).get('/users');

        expect(result.status).toBe(200);

        const { body: { users } } =  result;

        expect(users.length).toBeDefined();
        console.log(users);

        return result;
    });
  });
