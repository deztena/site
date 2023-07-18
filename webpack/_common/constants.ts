const constants = {
  analyzeBundle: process.env.ANALYZE_BUNDLE === '1',
  isDev: process.env.NODE_ENV !== 'production',
  staticPath: process.env.STATIC_PATH || '/',
  port: Number(process.env.PORT || '3000'),
  host: process.env.HOST || '0.0.0.0',
};
export default constants;
