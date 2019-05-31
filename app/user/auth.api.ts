import { injectable } from '@servicetitan/react-ioc';
import { AxiosPromise } from 'axios';

import { mockResponse } from '../mocks/api';
import { Dave } from '../mocks/user';
import { User } from './models';

export interface IAuthApi {
    register(data: User): AxiosPromise<void>;
    login(data: User): AxiosPromise<User>;
}

@injectable()
export class AuthApi implements IAuthApi {
    register(data: User) {
        return mockResponse({
            log: 'AuthApi.register',
            data,
            response: void 0,
        });
    }

    login(data: User) {
        return mockResponse({
            log: 'AuthApi.login',
            data,
            response: Dave,
        });
    }
}
