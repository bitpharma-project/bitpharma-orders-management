export const ApiServer = process.env.NODE_ENV === 'development' ? 'http://api.bitpharma.xyz/api' : 'https://api.bitpharma.xyz/api';
export const WSConnection = process.env.NODE_ENV === 'development' ? 'ws://api.bitpharma.xyz' : 'wss://api.bitpharma.xyz';
export const Server = process.env.NODE_ENV === 'development' ? 'http://api.bitpharma.xyz' : 'https://api.bitpharma.xyz';

// export const ApiServer = process.env.NODE_ENV === 'development' ? 'http://0.0.0.0:3002/api' : 'http://api.bitpharma.xyz/api';
// export const WSConnection = process.env.NODE_ENV === 'development' ? 'ws://0.0.0.0:3002' : 'ws://api.bitpharma.xyz';
// export const Server = process.env.NODE_ENV === 'development' ? 'http://0.0.0.0:3002' : 'http://api.bitpharma.xyz';


// 157.230.74.254
