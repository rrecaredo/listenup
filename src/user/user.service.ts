import { getFriends, getRelatedFriends } from '../gateways/friends.gateway';
import { getUserPlays } from '../gateways/plays.gateway';
import {ExtendedUser, ExtendedUserWithTracking } from "./user.model";

const getExtendedUser = async (username : string): Promise<ExtendedUser> => {
    const userPlaysRequest = getUserPlays(username);
    const userFriendsRequest = getRelatedFriends(username);

    const [playsResponse, friendsResponse] = await Promise.all([userPlaysRequest, userFriendsRequest]);

    return {
        username,
        plays: playsResponse.plays.length,
        friends: friendsResponse.friends.length,
        uri: `/users/${username}`
    };
};

export const getUsers = async () : Promise<ExtendedUser[]> => {
    const friendsResponse = await getFriends();

    if (!friendsResponse.friends || !friendsResponse.friends.length)
        throw new Error('Something went wrong with /friends endpoint, invalid data');

    const users = friendsResponse.friends;
    const getFullUserRequests = users.map(user => getExtendedUser(user.username));
    const extendedUsers = await Promise.all(getFullUserRequests);

    return extendedUsers;
};

export const getUser = async (username: string) : Promise<ExtendedUserWithTracking> => {
    const { plays } = await getUserPlays(username);
    const { friends } = await getRelatedFriends(username);
    return {
        username,
        plays: plays.length,
        friends: friends.length,
        tracks: plays.filter((play, index) => plays.indexOf(play) >= index).length,
        uri: `/users/${username}`
    }
};
