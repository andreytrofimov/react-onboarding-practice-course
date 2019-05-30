import { injectable } from '@servicetitan/react-ioc';
import { AxiosPromise } from 'axios';

import { mockResponse } from '../mocks/api';
import { Dave, Users } from '../mocks/user';

export interface UserDTO {
    id: number;
    login: string;
    role: string;
}

export type EditableUserDTO = Pick<UserDTO, Exclude<keyof UserDTO, 'id'>>;
export type EditUserDTO = Partial<EditableUserDTO>;

export type DeleteUserDTO = Pick<UserDTO, 'id'>;

export interface IUserApi {
    getAll(): AxiosPromise<UserDTO[]>;
    edit(data: EditUserDTO): AxiosPromise<UserDTO>;
    delete(data: DeleteUserDTO): AxiosPromise<void>;
}

@injectable()
export class UserApi implements IUserApi {
    getAll(): AxiosPromise<UserDTO[]> {
        return mockResponse({
            log: 'UserApi.getAll',
            data: void 0,
            response: Users,
        });
    }

    edit(data: EditUserDTO) {
        return mockResponse({
            log: 'UserApi.edit',
            data,
            response: Dave,
        });
    }

    delete(data: DeleteUserDTO) {
        return mockResponse({
            log: 'UserApi.delete',
            data,
            response: void 0,
        });
    }
}
