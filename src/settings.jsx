export const ApiServer = process.env.NODE_ENV === 'development' ? 'http://0.0.0.0:32783/api' : '';
export const WSConnection = process.env.NODE_ENV === 'development' ? 'ws://0.0.0.0:32783/cable' : '';

