import request from 'supertest';
import server from '../src/server';
import toCamel from '@cross/to-camel';
import * as friendFakes from './fakes/friends.fake';
import * as playFakes from './fakes/plays.fake';

jest.mock('@gateways/friends.gateway');
jest.mock('@gateways/plays.gateway');

import { getFriends, getRelatedFriends } from '../src/gateways/friends.gateway';
import { getUserPlays } from '../src/gateways/plays.gateway';
import { ExtendedUserWithTracking} from "../src/user/user.model";

(getFriends as jest.Mock<any>).mockReturnValue(Promise.resolve(friendFakes.allFriendsMock));

(getRelatedFriends as jest.Mock<any>).mockImplementation(
    (username: string) => Promise.resolve(friendFakes[`${toCamel(username)}Mock`]));

(getUserPlays as jest.Mock<any>).mockImplementation(
    (username: string) => Promise.resolve(playFakes[`${toCamel(username)}PlaysMock`]));

const testSpecificUser = async (username: string, expectation: ExtendedUserWithTracking) => {
    const uri = `/users/${username}`;
    const result = await request(server).get(uri);
    const { body: user, status } =  result;

    expect(status).toBe(200);
    expect(user).toEqual(expectation);
};

describe('GET all users', () => {
    it('should return 200 OK with a collection of Users', async () => {
        const result = await request(server).get('/users');
        const { body: { users }, status } =  result;

        expect(status).toBe(200);
        expect(users).toEqual( [
                { username: 'test_user_0', plays: 9, friends: 2, uri: '/users/test_user_0' },
                { username: 'test_user_1', plays: 3, friends: 1, uri: '/users/test_user_1' },
                { username: 'test_user_2', plays: 0, friends: 0, uri: '/users/test_user_2' }
            ]);
    });
  });

describe('GET specific user',   () => {
    it ('should return single user information', async () => {
        await testSpecificUser('test_user_0', {
            username: 'test_user_0',
            plays: 9,
            friends: 2,
            tracks: 5,
            uri: '/users/test_user_0'
        });

        await testSpecificUser('test_user_1', {
            username: 'test_user_1',
            plays: 3,
            friends: 1,
            tracks: 1,
            uri: '/users/test_user_1'
        });

        await testSpecificUser('test_user_2', {
            username: 'test_user_2',
            plays: 0,
            friends: 0,
            tracks: 0,
            uri: '/users/test_user_2'
        });
    });
});
