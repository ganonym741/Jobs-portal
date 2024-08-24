export const USER_SESSION_TTL = 3 * 60 * 60 * 1000; // <--- ABOUT 3 HOURS
export const USER_SESSION_PREFIX = 'user:';

export const PASSSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}/;
