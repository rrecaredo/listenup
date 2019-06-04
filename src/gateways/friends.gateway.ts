import axios from 'axios';

export interface BaseUser {
    username: string;
    uri: string;
}

export interface FriendsResponse {
    friends: BaseUser[];
    uri: string;
}

export interface UserFriendsResponse {
    friends: string[];
    uri: string;
}

export const getFriends = async () => {
    const friendsResponse = await axios.get<FriendsResponse>('http://localhost:8000/friends');
    return friendsResponse.data;
};

export const getRelatedFriends = async (username: string) => {
    const relatedFriendsResponse = await axios.get<UserFriendsResponse>(`http://localhost:8000/friends/${username}`);
    return relatedFriendsResponse.data;
};
