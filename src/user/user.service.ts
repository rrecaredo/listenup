import { Friend, getFriends as getFriendsGateway, getRelatedFriends, FriendsResponse, UserFriendsResponse } from '../services/friends';
import { getUserPlays, PlaysResponse } from '../services/plays';

const getTotalPlaysFromGivenFriends = async (friends: Friend[]) => {
    const userPlayPromises = friends.map(friend => getUserPlays(friend.username));

    console.log(friends);

    const mapUserTotalPlays = (multiPlaysResponse: PlaysResponse[]) =>
        multiPlaysResponse.map(playsResponse => playsResponse.plays.length);

    return await Promise
      .all(userPlayPromises)
      .then(mapUserTotalPlays);
};

// TODO: Improve naming, it is not intuitive. Could this be DRYed up?
const getTotalFriendsFromGivenFriends = async (friends: Friend[]) => {
    const userFriendsPromise = friends.map(friend => getRelatedFriends(friend.username));

    const mapUserTotalFriends = (multiPlaysResponse: UserFriendsResponse[]) =>
    {
        return multiPlaysResponse.map(playsResponse => playsResponse.friends.length);
    }

    return await Promise
      .all(userFriendsPromise)
      .then(mapUserTotalFriends);
};

export const getUsers = async () : Promise<Friend[]> => {
    const friendsResponse = await getFriendsGateway();

    if (!friendsResponse.friends || !friendsResponse.friends.length)
        throw new Error('Something went wrong with /friends endpoint, invalid data');

    const users = friendsResponse.friends;

    // TODO: Combine both Promises[] into one
    const usersTotalPlays = await getTotalPlaysFromGivenFriends(users);
    const usersTotalFriends = await getTotalFriendsFromGivenFriends(users);

    const extendedUsers = users.map((user, index) =>
        ({
            ...user,
            plays: usersTotalPlays[index],
            friends: usersTotalFriends[index]
        }));

    return extendedUsers;
};
