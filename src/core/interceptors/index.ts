import { BadRequestInterceptor } from './bad-request.interceptor';
import { NotFoundInterceptor } from './not-found.interceptor';

export const interceptors = [NotFoundInterceptor, BadRequestInterceptor];
