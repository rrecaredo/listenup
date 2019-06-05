import axios from 'axios';
import '../cross/make-axios-resilent';
import urljoin from 'url-join';
import { BaseUriResource } from '../cross/base-uri-resource';
require('dotenv').config();

const baseUrl = process.env.FRIENDS_SERVICE_URL || 'http://localhost:8000/friends';

export interface FriendsResponse {
    friends: BaseUriResource[];
    uri: string;
}

export interface UserFriendsResponse extends BaseUriResource {
    friends: string[];
}

export const getFriends = async () => {
    const friendsResponse = await axios.get<FriendsResponse>(baseUrl);
    return friendsResponse.data;
};

export const getRelatedFriends = async (username: string) => {
    const relatedFriendsResponse = await axios.get<UserFriendsResponse>(urljoin(baseUrl, username));
    return relatedFriendsResponse.data;
};
