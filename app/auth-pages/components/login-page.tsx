import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Button, ButtonGroup, Form, Link } from '@servicetitan/design-system';
import { provide, useDependencies } from '@servicetitan/react-ioc';

import { ErrorMessage } from '../../common/components/error-message';
import { Label } from '../../common/components/label/label';
import { LoginStore } from '../stores/login.store';
import { AuthLayout } from './auth-layout';

const LoginPage_: React.FC = observer(() => {
    const [{ login: submitLogin, serverError, form }] = useDependencies(LoginStore);
    const { login, password } = form.$;
    return (
        <AuthLayout title="Login">
            <ErrorMessage msg={serverError} />

            <Form onSubmit={submitLogin}>
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
                />

                <ButtonGroup fullWidth>
                    <Link href="/#/register" color="primary">Sign Up</Link>
                    <Button full primary type="submit">Login</Button>
                </ButtonGroup>
            </Form>
        </AuthLayout>
    );
});

export const LoginPage: typeof LoginPage_ = provide({
    singletons: [
        LoginStore,
    ],
})(LoginPage_);
