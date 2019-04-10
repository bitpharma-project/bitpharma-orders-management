export const ApiServer = process.env.NODE_ENV === 'development' ? 'http://0.0.0.0:3002/api' : 'http://api.bitpharma.xyz/api';
export const WSConnection = process.env.NODE_ENV === 'development' ? 'http://0.0.0.0:3002' : 'http://api.bitpharma.xyz';
export const Server = process.env.NODE_ENV === 'development' ? 'http://0.0.0.0:3002' : 'http://api.bitpharma.xyz';
