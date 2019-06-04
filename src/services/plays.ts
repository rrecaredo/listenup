import axios from 'axios';

export interface PlaysResponse {
    plays: string[];
    uri: string;
}

export const getUserPlays = async (username: string) => {
    const playsResponse = await axios.get<PlaysResponse>(`http://localhost:8001/plays/${username}`);
    return playsResponse.data;
};
