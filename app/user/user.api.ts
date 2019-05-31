import { injectable } from '@servicetitan/react-ioc';
import { AxiosPromise } from 'axios';

import { mockResponse } from '../mocks/api';
import { Dave, Users } from '../mocks/user';
import { User } from './models';

export interface IUserApi {
    getAll(): AxiosPromise<User[]>;
    edit(data: User): AxiosPromise<User>;
    delete(data: DeleteUserDTO): AxiosPromise<void>;
}

export type DeleteUserDTO = User['id'];

@injectable()
export class UserApi implements IUserApi {
    getAll(): AxiosPromise<User[]> {
        return mockResponse({
            log: 'UserApi.getAll',
            data: void 0,
            response: Users,
        });
    }

    edit(data: User) {
        return mockResponse({
            log: 'UserApi.edit',
            data,
            response: Dave,
        });
    }

    delete(id: DeleteUserDTO) {
        return mockResponse({
            log: 'UserApi.delete',
            data: id,
            response: void 0,
        });
    }
}
