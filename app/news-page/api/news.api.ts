import { AxiosPromise } from 'axios';

import { Post } from '../models/post';

export interface INewsApi {
    getAll(): AxiosPromise<Post[]>;
    create(data: Post): AxiosPromise<Post | undefined>;
    edit(data: Post): AxiosPromise<Post | undefined>;
    delete(data: DeletePostDTO): AxiosPromise<void>;
}

export type DeletePostDTO = Required<Post>['id'];
