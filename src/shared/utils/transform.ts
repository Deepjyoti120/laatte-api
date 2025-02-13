import { User } from "../../models/user.entity";
export function transformUser(user:  User) {
    const { password, verification_token, verification_token_time, ...rest } = user;
    return rest;
}
