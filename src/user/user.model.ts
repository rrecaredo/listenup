import { BaseUriResource } from '../cross/base-uri-resource';

export class User extends BaseUriResource {
    plays: number;
    friends: number;
}

export class ExtendedUser extends User {
    tracks: number;
}
