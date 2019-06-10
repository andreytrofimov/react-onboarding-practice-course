import { AxiosPromise, AxiosResponse } from 'axios';

import { injectable } from '@servicetitan/react-ioc';

import { User } from '../../common/models/user';
import { mockResponse } from '../../mocks/api';
import { UsersDB } from '../../mocks/user.db';

export interface IAuthApi {
    register(data: User): AxiosPromise<void>;
    login(data: LoginDTO): AxiosPromise<User | undefined>;
    isLoginAlreadyInUse(login: IsLoginFreeDTO): AxiosPromise<boolean>;
}

export type LoginDTO = Required<Pick<User, 'login' | 'password'>>;
export type IsLoginFreeDTO = Required<User>['login'];

@injectable()
export class AuthApi implements IAuthApi {
    register(data: User): Promise<AxiosResponse<void>> {
        const success = UsersDB.create(data);
        if (!success) {
            return mockResponse({
                status: 403,
                statusText: 'Login is already taken',
                log: 'AuthApi.register',
                data: void 0,
                response: void 0,
            })
        }

        return mockResponse({
            log: 'AuthApi.register',
            data: void 0,
            response: void 0,
        });
    }

    login(data: LoginDTO): Promise<AxiosResponse<User | undefined>> {
        const { login, password } = data;
        const user = UsersDB.findByLogin(login);

        if (!user || user.password !== password) {
            return mockResponse({
                status: 401,
                statusText: 'Incorrect login or password',
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

    isLoginAlreadyInUse(login: IsLoginFreeDTO): Promise<AxiosResponse<boolean>> {
        return mockResponse({
            log: 'AuthApi.isLoginAlreadyInUse',
            data: login,
            response: UsersDB.isLoginAlreadyInUse(login),
        });
    }
}
