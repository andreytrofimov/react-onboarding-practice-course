import * as React from 'react';
import { HashRouter } from 'react-router-dom';

import { Stack, Text } from '@servicetitan/design-system';

import { getUserConfirmation } from './common/components/confirm-navigation/confirm-navigation';
import { SideNavigation } from './common/components/side-navigation';
import * as Styles from './app.less';

export const App: React.FC = () => (
    <HashRouter getUserConfirmation={getUserConfirmation}>
        <div className={Styles.container}>
            <div className={Styles.sideNav}>
                <SideNavigation/>
            </div>
            <div className={Styles.content}>
                <Stack alignItems="center" justifyContent="center" className={Styles.content}>
                    <Text size={5}>React Onboarding Practice Course Template</Text>
                </Stack>
            </div>
        </div>
    </HashRouter>
);
