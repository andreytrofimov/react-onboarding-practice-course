import * as React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import { Stack, Text } from '@servicetitan/design-system';

import { getUserConfirmation } from './common/components/confirm-navigation/confirm-navigation';
import { SideNavigation } from './common/components/side-navigation';
import { LoginPage, RegisterPage } from './auth-pages';
import { UsersPage } from './users-page';

export const App: React.FC = () =>
    (
        <HashRouter getUserConfirmation={ getUserConfirmation }>
            <Switch>
                <Route path="/login" component={LoginPage}/>
                <Route path="/register" component={RegisterPage}/>

                <Route path="*" component={LoggedIn}/>
            </Switch>
        </HashRouter>
    );

const LoggedIn: React.FC = () =>
    (
        <Stack alignItems="flex-start" justifyContent="center" className="flex-auto">
            <Stack.Item alignSelf='flex-start'>
                <SideNavigation/>
            </Stack.Item>
            <Stack.Item fill alignSelf="stretch" className="d-f">
                <Switch>
                    <Route path="/users" component={UsersPage}/>

                    <Route path="*" component={DefaultPage}/>
                </Switch>
            </Stack.Item>
        </Stack>
    );

const DefaultPage: React.FC = () =>
    (
        <Stack alignItems="center" justifyContent="center" className="flex-auto">
            <Text size={5}>React Onboarding Practice Course Template</Text>
        </Stack>
    );
