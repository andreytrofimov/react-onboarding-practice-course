import * as React from 'react';
import { HashRouter } from 'react-router-dom';

import { Stack, Text } from '@servicetitan/design-system';

import { getUserConfirmation } from './common/components/confirm-navigation/confirm-navigation';
import { SideNavigation } from './common/components/side-navigation';

export const App: React.FC = () => (
    <HashRouter getUserConfirmation={getUserConfirmation}>
        <Stack alignItems="center" justifyContent="center" className="flex-auto">
            <Stack.Item alignSelf='flex-start'>
                <SideNavigation/>
            </Stack.Item>
            <Stack.Item fill>
                <Text size={5}>React Onboarding Practice Course Template</Text>
            </Stack.Item>
        </Stack>
    </HashRouter>
);
