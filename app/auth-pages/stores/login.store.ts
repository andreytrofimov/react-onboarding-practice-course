import { FormState } from 'formstate';
import { action, observable, runInAction } from 'mobx';

import { inject, injectable } from '@servicetitan/react-ioc';

import { AuthStore } from '../../common/stores/auth.store';
import { formStateToJS, InputFieldState } from '../../common/utils/form-helpers';
import { FormValidators } from '../../common/utils/form-validators';
import { AuthApi } from '../api/auth.api';

@injectable()
export class LoginStore {
    constructor(
        @inject(AuthApi)
        private authApi: AuthApi,

        @inject(AuthStore)
        private authStore: AuthStore,
    ) {
    }

    @observable
    serverError?: string;

    form = new FormState({
        login: new InputFieldState<string>('').validators(
            FormValidators.required,
        ),
        password: new InputFieldState<string>('').validators(
            FormValidators.required,
        ),
    });

    @action
    login = async () => {
        this.serverError = '';

        const res = await this.form.validate();
        if (res.hasError) {
            return;
        }

        const credentials = formStateToJS(this.form);
        const r = await this.authApi.login(credentials);

        if (r.status !== 200) {
            runInAction(() => { this.serverError = r.statusText });
            return;
        }

        this.authStore.login(r.data!);
    };
}
