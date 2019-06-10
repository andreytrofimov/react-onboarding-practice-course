import { FormState, Validator } from 'formstate';
import { action, observable, runInAction } from 'mobx';

import { inject, injectable } from '@servicetitan/react-ioc';

import { Role } from '../../common/models/role';
import { DropdownFieldState, formStateToJS, InputFieldState } from '../../common/utils/form-helpers';
import { FormValidators } from '../../common/utils/form-validators';
import { AuthApi, IsLoginFreeDTO } from '../api/auth.api';

@injectable()
export class RegisterStore {
    constructor(
        @inject(AuthApi)
        private authApi: AuthApi,
    ) {
    }

    @observable
    registered: boolean = false;

    @observable
    serverError: string = '';

    strongPasswordValidator: Validator<string> = v =>
        !FormValidators.passwordIsValidFormat(v)
        && 'Your password must be at least 8 characters long including a number, ' +
        'a lowercase letter, and an uppercase letter';

    loginIsNotInUseValidator: Validator<string> = async v =>
        (await this.isLoginAlreadyInUse(v)) && 'Login is already taken';

    passwordMatchValidator: Validator<string> = v =>
        (this.form.$.passwordConfirmation.$ !== v) && 'Passwords must match';

    passwordMatchConfirmationValidator: Validator<string> = v =>
        (this.form.$.password.$ !== v) && ' ';

    form = new FormState({
        login: new InputFieldState<string>('').validators(
            FormValidators.required,
            this.loginIsNotInUseValidator,
        ),
        password: new InputFieldState<string>('').validators(
            FormValidators.required,
            this.strongPasswordValidator,
            this.passwordMatchValidator,
        ),
        passwordConfirmation: new InputFieldState<string>('').validators(
            FormValidators.required,
            this.passwordMatchConfirmationValidator
        ),
        role: new DropdownFieldState<Role>(Role.Public).validators(
            FormValidators.required,
        ),
    });

    @action
    register = async () => {
        this.serverError = '';
        const res = await this.form.validate();
        if (res.hasError) {
            return;
        }

        const data = formStateToJS(this.form);

        const r = await this.authApi.register(data);

        if (r.status !== 200) {
            runInAction(() => {
                this.serverError = r.statusText;
            });
            return;
        }

        runInAction(() => {
            this.registered = true;
        });
    };

    isLoginAlreadyInUse = async (login: IsLoginFreeDTO): Promise<string | boolean> => {
        const r = await this.authApi.isLoginAlreadyInUse(login);

        if (r.status !== 200) {
            return r.statusText;
        }

        return r.data;
    };
}
