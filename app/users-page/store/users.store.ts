import { action, computed, observable, runInAction } from 'mobx';

import { inject, injectable } from '@servicetitan/react-ioc';

import { InMemoryDataSource, KendoGridState } from '../../common/components/kendo-grid/kendo-grid-state';
import { User } from '../../common/models/user';
import { UserApi } from '../api/user.api';

type UsersGridState = KendoGridState<User, User['id']>;

@injectable()
export class UsersStore {
    constructor(
        @inject(UserApi)
        private userApi: UserApi,
    ) {
    }

    gridState: UsersGridState = new KendoGridState({
        pageSize: 5,
        idSelector: u => u.id,
    });

    @observable
    serverError = '';

    @computed
    get inEdit() { return this.gridState.inEdit.size > 0; }

    @action
    load = async () => {
        this.serverError = '';

        const r = await this.userApi.getAll();
        if (r.status !== 200) {
            runInAction(() => { this.serverError = r.statusText });
        }

        this.gridState.setDataSource(new InMemoryDataSource(r.data));
    };

    edit = (u: User) => {
        this.gridState.edit(u);
    };

    @action
    saveEdit = async (u: User) => {
        this.serverError = '';

        const r = await this.userApi.edit(u);
        if (r.status !== 200) {
            runInAction(() => { this.serverError = r.statusText });
            return;
        }

        this.gridState.saveEdit(u);
    };

    cancelEdit = (u: User) => {
        this.gridState.cancelEdit(u);
    };

    @action
    delete = async (u: User) => {
        this.serverError = '';
        const r = await this.userApi.delete(u.id!);
        if (r.status !== 200) {
            runInAction(() => { this.serverError = r.statusText });
            return;
        }

        this.gridState.removeFromDataSource(i => i.id === u.id);
    };
}
