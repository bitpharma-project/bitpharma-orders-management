// export const ApiServer = process.env.NODE_ENV === 'development' ? 'http://api.bitpharma.xyz/api' : 'http://api.bitpharma.xyz/api';
// export const WSConnection = process.env.NODE_ENV === 'development' ? 'ws://api.bitpharma.xyz' : 'ws://api.bitpharma.xyz';
// export const Server = process.env.NODE_ENV === 'development' ? 'http://api.bitpharma.xyz' : 'http://api.bitpharma.xyz';

export const ApiServer = process.env.NODE_ENV === 'development' ? 'http://0.0.0.0:3002/api' : 'http://api.bitpharma.xyz/api';
export const WSConnection = process.env.NODE_ENV === 'development' ? 'ws://0.0.0.0:3002' : 'ws://api.bitpharma.xyz';
export const Server = process.env.NODE_ENV === 'development' ? 'http://0.0.0.0:3002' : 'http://api.bitpharma.xyz';


// 157.230.74.254
