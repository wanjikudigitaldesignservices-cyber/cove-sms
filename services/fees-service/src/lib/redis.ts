import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

export const redisPub = new Redis(REDIS_URL);
export const redisSub = new Redis(REDIS_URL);

redisPub.on('error', (err) => console.error('Redis Publisher Error:', err));
redisSub.on('error', (err) => console.error('Redis Subscriber Error:', err));
