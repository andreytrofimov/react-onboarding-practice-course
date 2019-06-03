import * as React from 'react';

import { SideNav } from '@servicetitan/design-system';

import { SideNavLinkItem } from './sidenav-link-item';

export const SideNavigation = () =>
    (
        <SideNav title="React Onboarding Practice Course">
            <SideNavLinkItem pathname='/users'>
                Users
            </SideNavLinkItem>
            <SideNavLinkItem pathname='/news'>
                News Feed
            </SideNavLinkItem>
            <br/>
            <SideNav.Item>
                Logout
            </SideNav.Item>
        </SideNav>
    );
