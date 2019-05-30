import { AxiosPromise } from 'axios';

export function mockResponse<T, R>(ps: {
    log: string;
    data: T;
    response: R;
}): AxiosPromise<R> {
    console.log(ps.log, ps.data);

    return Promise.resolve({
        data: ps.response,
        status: 200,
        statusText: '',
        config: {},
        headers: {},
    });
}
