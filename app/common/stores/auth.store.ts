import { action, computed, observable } from 'mobx';

import { injectable } from '@servicetitan/react-ioc';

import { User } from '../models/user';

@injectable()
export class AuthStore {
    @observable
    private user?: User;

    @computed
    get isAuthenticated(): boolean {
        return !!this.user
    }

    @action
    login = (u: User) => {
        this.user = u;
    };

    @action
    logout = (): void => {
        this.user = void 0;
    };
}
