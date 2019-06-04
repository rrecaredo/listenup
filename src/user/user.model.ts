import { BaseUriResource } from "@cross/base-uri-resource";

export class ExtendedUser extends BaseUriResource {
    plays: number;
    friends: number;
}

// What a horrible name, I need to sort this out
export class ExtendedUserWithTracking extends ExtendedUser {
    tracks: number;
}
