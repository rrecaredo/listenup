export class ExtendedUser {
    username: string;
    plays: number;
    friends: number;
    uri: string;
}

// What a horrible name, I need to sort this out
export class ExtendedUserWithTracking extends ExtendedUser {
    tracks: number;
}
