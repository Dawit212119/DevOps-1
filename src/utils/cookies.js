export const cookies = {
  getOptions: () => ({
    httpOnly: true,
    secure: process.env.NODE_ENV,
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000,
  }),
  set: (res, name, token, option = {}) => {
    res.cookie(name, token, { ...cookies.getOptions, ...option });
  },
  clear: (res, name, option = {}) => {
    res.clearCokkie(name, { ...cookies.getOptions, ...option });
  },
  get: (res, name) => {
    return res.cookies[name];
  },
};
