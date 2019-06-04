import axios from 'axios';
import '../cross/make-axios-resilent';
import urljoin from 'url-join';
import { BaseUriResource } from "@cross/base-uri-resource";
require('dotenv').config();

const baseUrl = process.env.PLAYS_SERVICE_URL || 'http://localhost:8001/plays';

export interface PlaysResponse extends BaseUriResource {
    plays: string[];
}

export const getUserPlays = async (username: string) => {
    const playsResponse = await axios.get<PlaysResponse>(urljoin(baseUrl, username));
    return playsResponse.data;
};
