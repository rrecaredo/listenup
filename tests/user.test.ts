import request from 'supertest';
import server from '../src/server';
import toCamel from '../src/utils/toCamel';
import * as friendFakes from './fakes/friends.fake';
import * as playFakes from './fakes/plays.fake';

jest.mock('../src/gateways/friends.gateway');
jest.mock('../src/gateways/plays.gateway');

import { getFriends, getRelatedFriends } from '../src/gateways/friends.gateway';
import { getUserPlays } from '../src/gateways/plays.gateway';

(getFriends as any).mockReturnValue(Promise.resolve(friendFakes.allFriendsMock));

(getRelatedFriends as any).mockImplementation(
    (username: string) => Promise.resolve(friendFakes[`${toCamel(username)}Mock`]));

(getUserPlays as any).mockImplementation(
    (username: string) => Promise.resolve(playFakes[`${toCamel(username)}PlaysMock`]));

describe('GET /users', () => {
    it('should return 200 OK with a collection of Users', async () => {
        const result = await request(server).get('/users');

        expect(result.status).toBe(200);

        const { body: { users } } =  result;

        expect(users.length).toBeDefined();
        expect(users).toEqual( [
                { username: 'test_user_0', plays: 9, friends: 2 },
                { username: 'test_user_1', plays: 3, friends: 1 },
                { username: 'test_user_2', plays: 0, friends: 0 }
            ]);

        return result;
    });
  });
