import { getFriends as getFriendsGateway, getRelatedFriends } from '../gateways/friends.gateway';
import { getUserPlays } from '../gateways/plays.gateway';
import { ExtendedUser } from "./user.model";

const getExtendedUser = async (username : string): Promise<ExtendedUser> => {
    const userPlaysRequest = getUserPlays(username);
    const userFriendsRequest = getRelatedFriends(username);

    const [playsResponse, friendsResponse] = await Promise.all([userPlaysRequest, userFriendsRequest]);

    return {
        username,
        plays: playsResponse.plays.length,
        friends: friendsResponse.friends.length
    };
};

export const getUsers = async () : Promise<ExtendedUser[]> => {
    const friendsResponse = await getFriendsGateway();

    if (!friendsResponse.friends || !friendsResponse.friends.length)
        throw new Error('Something went wrong with /friends endpoint, invalid data');

    const users = friendsResponse.friends;
    const getFullUserRequests = users.map(user => getExtendedUser(user.username));
    const extendedUsers = await Promise.all(getFullUserRequests);

    return extendedUsers;
};
