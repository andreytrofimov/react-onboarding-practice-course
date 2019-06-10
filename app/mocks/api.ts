import { AxiosResponse } from 'axios';

type MockResponseParams<R, T> = {
    log: string;
    data: T;
    response: R;
    status?: number;
    statusText?: string;
};

export async function mockResponse<R, T>({
    log: logMsg,
    data,
    response,
    status = 200,
    statusText = '',
}: MockResponseParams<R, T>): Promise<AxiosResponse<R>> {
    await randomLatency(100, 700);

    const r = {
        data: response,
        status,
        statusText,
        config: {},
        headers: {},
    };

    console.log(logMsg, data, r);

    return r;
}

function randomLatency(from: number, to: number) {
    const range = to - from;
    const n = from + (range * Math.random());
    return new Promise(r => setTimeout(r, n));
}
