const constants = {
  isDev: process.env.NODE_ENV !== 'production',
  staticPath: process.env.STATIC_PATH || '/',
  port: Number(process.env.PORT || '3000'),
  host: process.env.HOST || 'localhost',
};
export default constants;
