const sequentialNumericArray = [...Array(3).keys()];
import getIndexedUsername from '@cross/get-indexed-username';

export const allFriendsFake = {
    friends: sequentialNumericArray
    .map(getIndexedUsername)
    .map(username => {
        return {
            username,
            uri: `/friends/${username}`
        }
    })
};

const testUserFakeFactory = (userIndex: number, friendIndexes: number[] = []) => ({
    friends: friendIndexes.map(getIndexedUsername),
    uri: `/friends/${getIndexedUsername(userIndex)}`
});

export const testUser0Fake = testUserFakeFactory(0, [1, 2]);
export const testUser1Fake = testUserFakeFactory(1, [3]);
export const testUser2Fake = testUserFakeFactory(2);
