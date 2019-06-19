import { AxiosPromise } from 'axios';

import { injectable } from '@servicetitan/react-ioc';

import { mockResponse } from '../../mocks/api';
import { NewsDB } from '../../mocks/post.db';
import { Post } from '../models/post';

export interface INewsApi {
    getAll(): AxiosPromise<Post[]>;
    create(data: Post): AxiosPromise<Post | undefined>;
    edit(data: Post): AxiosPromise<Post | undefined>;
    delete(id: DeletePostDTO): AxiosPromise<void>;
}

export type DeletePostDTO = Required<Post>['id'];

@injectable()
export class NewsApi implements INewsApi {
    getAll() {
        return mockResponse({
            data: void 0,
            response: NewsDB.get(),
            log: 'NewsApi.getAll'
        });
    }

    create(data: Post) {
        const post = NewsDB.create(data);

        return mockResponse({
            log: 'NewsApi.register',
            data: data,
            response: post,
        });
    }

    edit(data: Post) {
        const post = NewsDB.update(data);
        if (!post) {
            return mockResponse({
                status: 404,
                statusText: 'Cannot find post',
                log: 'NewsApi.edit',
                data,
                response: post,
            });
        }

        return mockResponse({
            log: 'NewsApi.edit',
            data,
            response: post,
        });
    }

    delete(id: DeletePostDTO) {
        const success = NewsDB.delete(id);
        if (!success) {
            return mockResponse({
                status: 404,
                statusText: 'Cannot find post',
                log: 'NewsApi.delete',
                data: id,
                response: void 0,
            });
        }

        return mockResponse({
            log: 'NewsApi.delete',
            data: id,
            response: void 0,
        });
    }
}
