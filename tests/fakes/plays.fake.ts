import getIndexedUsername from "@cross/get-indexed-username";

const tracks = [
    '21C9B9FE-588C-9194-2146-048EE2CE4331',
    '0DF40285-55F7-23D6-3F75-F980F20A451F',
    'C721B0D3-8C4D-FFE1-EA79-028D7128E54A',
    'E75C38C1-E2BB-BAF6-620B-9255D035B693',
    '9345B5B5-1CBB-7E00-F5F5-FC951B174D3C',
    'CF4020A2-7F8C-7772-3743-E69C5DDDB3E6',
    '7D160777-99E7-FC4D-9146-D38D0EECD390',
    'BCA610EB-A135-F3FA-D2E6-D038764B00F7',
    'BA29E55A-CDC9-241A-F952-EB223F7F015F'
];

const testUserPlaysMockFactory = (userIndex: number, trackIndexes: number[] = []) => ({
    plays: trackIndexes.map(trackIndex => tracks[trackIndex]),
    uri: `/friends/${getIndexedUsername(userIndex)}`
});

export const testUser0PlaysMock = testUserPlaysMockFactory(0, [1, 1, 1, 2, 2, 3, 3, 4, 5]);
export const testUser1PlaysMock = testUserPlaysMockFactory(1, [6, 6, 6]);
export const testUser2PlaysMock = testUserPlaysMockFactory(2);
