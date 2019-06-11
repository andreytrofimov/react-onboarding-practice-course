import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Redirect } from 'react-router';

import { provide, useDependencies } from '@servicetitan/react-ioc';
import { Button, ButtonGroup, Form, Link } from '@servicetitan/design-system';

import { ErrorMessage } from '../../common/components/error-message';
import { Label } from '../../common/components/label/label';
import { Role } from '../../common/models/role';
import { enumToOptions } from '../../common/utils/form-helpers';
import { RegisterStore } from '../stores/register.store';

import { AuthLayout } from './auth-layout';

const roleOptions = enumToOptions(Role);

const RegisterPage_: React.FC = observer(() => {
    const [{ register, registered, serverError, form }] = useDependencies(RegisterStore);
    const { login, passwords, role } = form.$;
    const { password, confirmation } = passwords.$;
    return (
        <AuthLayout title="Register">
            {registered && (
                <Redirect to="/login" />
            )}

            <ErrorMessage msg={serverError} />

            <Form onSubmit={register}>
                <Form.Input
                    label={(
                        <Label
                            label="Login"
                            hasError={login.hasError}
                            error={login.error}
                        />
                    )}
                    value={login.value}
                    onChange={login.onChangeHandler}
                    error={login.hasError}
                />
                <Form.Input
                    label={(
                        <Label
                            label="Password"
                            hasError={password.hasError}
                            error={password.error}
                        />
                    )}
                    type="password"
                    value={password.value}
                    onChange={password.onChangeHandler}
                    error={password.hasError}
                />
                <Form.Input
                    label={(
                        <Label
                            label="Password Confirmation"
                            hasError={confirmation.hasError}
                            error={confirmation.error}
                        />
                    )}
                    type="password"
                    value={confirmation.value}
                    onChange={confirmation.onChangeHandler}
                    error={confirmation.hasError}
                />
                <Form.Select
                    label={(
                        <Label
                            label="Role"
                            hasError={role.hasError}
                            error={role.error}
                        />
                    )}
                    options={roleOptions}
                    value={role.value}
                    onChange={role.onChangeHandler}
                    error={role.hasError}
                />

                <ButtonGroup fullWidth>
                    <Link href="/#/login" color="primary">Sign In</Link>
                    <Button full primary type="submit">Create</Button>
                </ButtonGroup>
            </Form>
        </AuthLayout>
    );
});

export const RegisterPage: typeof RegisterPage_ = provide({
    singletons: [
        RegisterStore,
    ],
})(RegisterPage_);
