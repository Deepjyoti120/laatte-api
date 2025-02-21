export enum Role {
    ADMIN = 'admin',
    MODERATOR = 'moderator',
    USER = 'user',
}


export const RolesArray = Object.values(Role);

// Explanation of Roles:
// ADMIN – Has full control over the app, including managing users, reports, and settings.
// MODERATOR – Can review reports, ban users, and manage content.
// USER – A standard user with basic access to profiles, messages, and matches.
// PREMIUM_USER – A user with additional benefits like unlimited swipes, priority matches, or enhanced visibility.
// VERIFIED_USER – A user who has verified their identity, gaining additional trust and visibility.