import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom';

import { Stack, Text } from '@servicetitan/design-system';
import { provide, useDependencies } from '@servicetitan/react-ioc';

import { getUserConfirmation } from './common/components/confirm-navigation/confirm-navigation';
import { SideNavigation } from './common/components/side-navigation';
import { AuthRouter } from './auth-pages';
import { AuthStore } from './common/stores/auth.store';
import { UsersPage } from './users-page';

const App_: React.FC = observer(() => {
    const [{ isAuthenticated }] = useDependencies(AuthStore);

    return (
        <HashRouter getUserConfirmation={getUserConfirmation}>
            {isAuthenticated
                ? (<LoggedIn />)
                : (<AuthRouter />)
            }
        </HashRouter>
    );
});

export const App: typeof App_ = provide({
    singletons: [
        AuthStore,
    ]
})(App_);

const LoggedIn: React.FC = () =>
    (
        <Stack alignItems="flex-start" justifyContent="center" className="flex-auto">
            <Stack.Item alignSelf='flex-start'>
                <SideNavigation/>
            </Stack.Item>
            <Stack.Item fill alignSelf="stretch" className="d-f">
                <Switch>
                    <Route path="/users" component={UsersPage}/>

                    <Route exact path="/" component={DefaultPage}/>
                    <Redirect to="/" />
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
