import RedisService from './RedisService';

const redisQuestionsService = new RedisService('Questions', 3600);

export default redisQuestionsService;
