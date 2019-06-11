import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router';

import { provide } from '@servicetitan/react-ioc';

import { AuthApi } from '../api/auth.api';
import { LoginPage } from './login-page';
import { RegisterPage } from './register-page';

const AuthRouter_: React.FC = () => (
    <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />

        <Redirect to="/login" />
    </Switch>
);

export const AuthRouter: typeof AuthRouter_ = provide({
    singletons: [
        AuthApi,
    ],
})(AuthRouter_);
