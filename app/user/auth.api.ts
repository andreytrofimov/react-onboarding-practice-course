import { injectable } from '@servicetitan/react-ioc';
import { AxiosPromise } from 'axios';

import { mockResponse } from '../mocks/api';
import { Dave } from '../mocks/user';
import { UserDTO } from './user.api';

export interface LoginDTO {
    login: UserDTO['login'];
    password: string;
}

export interface IAuthApi {
    register(data: LoginDTO): AxiosPromise<void>;
    login(data: LoginDTO): AxiosPromise<UserDTO>;
}

@injectable()
export class AuthApi implements IAuthApi {
    register(data: LoginDTO) {
        return mockResponse({
            log: 'AuthApi.register',
            data,
            response: void 0,
        });
    }

    login(data: LoginDTO) {
        return mockResponse({
            log: 'AuthApi.login',
            data,
            response: Dave,
        });
    }
}
