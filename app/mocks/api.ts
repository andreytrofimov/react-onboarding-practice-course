import { AxiosResponse } from 'axios';

type MockResponseParams<R, T> = {
    log: string;
    data: T;
    response: R;
    status?: number;
    statusText?: string;
};

export async function mockResponse<R, T>({
    log,
    data,
    response,
    status = 200,
    statusText = '',
}: MockResponseParams<R, T>): Promise<AxiosResponse<R>> {
    await randomLatency(100, 700);

    console.log(log, data);

    return {
        data: response,
        status,
        statusText,
        config: {},
        headers: {},
    };
}

function randomLatency(from: number, to: number) {
    const diff = to - from;
    const n = from + (diff * Math.random());
    return new Promise(r => setTimeout(r, n));
}
