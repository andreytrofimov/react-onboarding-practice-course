import * as React from 'react';

import { useDependencies } from '@servicetitan/react-ioc';
import { SideNav } from '@servicetitan/design-system';

import { AuthStore } from '../../stores/auth.store';
import { SideNavLinkItem } from './sidenav-link-item';

export const SideNavigation = () => {
    const [{ logout }] = useDependencies(AuthStore);
    return (
        <SideNav title="React Onboarding Practice Course">
            <SideNavLinkItem pathname='/users'>
                Users
            </SideNavLinkItem>
            <SideNavLinkItem pathname='/news'>
                News Feed
            </SideNavLinkItem>
            <br/>
            <SideNav.Item onClick={logout}>
                Logout
            </SideNav.Item>
        </SideNav>
    );
};
