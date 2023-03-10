export const ironOptions = {
  cookieName: process.env.NEXT_PUBLIC_COOKIE_NAME,
  password: process.env.NEXT_PUBLIC_COOKIE_PASSWORD,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production" ? true : false,
  },
};
