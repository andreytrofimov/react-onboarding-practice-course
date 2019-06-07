import { injectable } from '@servicetitan/react-ioc';
import { AxiosPromise } from 'axios';

import { mockResponse } from '../mocks/api';
import { UsersDB } from '../mocks/user.db';
import { User } from './models';

export interface IAuthApi {
    register(data: User): AxiosPromise<void>;
    login(data: LoginDTO): AxiosPromise<User | undefined>;
}

export type LoginDTO = Required<Pick<User, 'login' | 'password'>>;

@injectable()
export class AuthApi implements IAuthApi {
    register(data: User) {
        const success = UsersDB.create(data);
        if (!success) {
            return mockResponse({
                status: 403,
                statusText: 'This login is already in use',
                log: 'AuthApi.register',
                data,
                response: void 0,
            })
        }

        return mockResponse({
            log: 'AuthApi.register',
            data,
            response: void 0,
        });
    }

    login(data: LoginDTO) {
        const { login, password } = data;
        const user = UsersDB.findByLogin(login);

        if (!user || user.password !== password) {
            return mockResponse({
                status: 401,
                statusText: 'Wrong login or password',
                log: 'AuthApi.login',
                data,
                response: void 0,
            })
        }

        return mockResponse({
            log: 'AuthApi.login',
            data,
            response: user,
        });
    }
}
