import { injectable } from '@servicetitan/react-ioc';
import { AxiosPromise } from 'axios';

import { mockResponse } from '../mocks/api';
import { UsersDB } from '../mocks/user.db';
import { User } from './models';

export interface IUserApi {
    getAll(): AxiosPromise<User[]>;
    edit(data: User): AxiosPromise<User | undefined>;
    delete(data: DeleteUserDTO): AxiosPromise<void>;
}

export type DeleteUserDTO = Required<User>['id'];

@injectable()
export class UserApi implements IUserApi {
    getAll() {
        return mockResponse({
            data: void 0,
            response: UsersDB.get(),
            log: 'UserApi.getAll'
        });
    }

    edit(data: User) {
        const user = UsersDB.update(data);
        if (!user) {
            return mockResponse({
                status: 404,
                statusText: 'Cannot find user',
                log: 'UserApi.edit',
                data,
                response: user,
            });
        }

        return mockResponse({
            log: 'UserApi.edit',
            data,
            response: user,
        });
    }

    delete(id: DeleteUserDTO) {
        const success = UsersDB.delete(id);
        if (!success) {
            return mockResponse({
                status: 404,
                statusText: 'Cannot find user',
                log: 'UserApi.delete',
                data: id,
                response: void 0,
            });
        }

        return mockResponse({
            log: 'UserApi.delete',
            data: id,
            response: void 0,
        });
    }
}
