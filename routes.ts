/**
 * These routes are accessible without authentication
 * Anyone can visit them with no registration or login required
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
    "/auth/new-verification",
    
];

/**
 * These routes are accessible only after authentication
 * Anyone can visit them with no registration required
 * @type {string[]}
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/password-reset",
    "/auth/new-password",
]

/**
 * These routes are accessible only after registration
 * default route
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * redirect after login
 * Anyone can visit them with no registration required
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/dashboard/settings";