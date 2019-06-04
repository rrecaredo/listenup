const sequentialNumericArray = [...Array(3).keys()];
import getIndexedUsername from "@cross/get-indexed-username";

export const allFriendsMock = {
    friends: sequentialNumericArray
    .map(getIndexedUsername)
    .map(username => {
        return {
            username,
            uri: `/friends/${username}`
        }
    })
};

const testUserMockFactory = (userIndex: number, friendIndexes: number[] = []) => ({
    friends: friendIndexes.map(getIndexedUsername),
    uri: `/friends/${getIndexedUsername(userIndex)}`
});

export const testUser0Mock = testUserMockFactory(0, [1, 2]);
export const testUser1Mock = testUserMockFactory(1, [3]);
export const testUser2Mock = testUserMockFactory(2);
