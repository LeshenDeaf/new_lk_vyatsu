import RedisService from './RedisService';

const redisUserService = new RedisService('User', 3600);

export default redisUserService;
