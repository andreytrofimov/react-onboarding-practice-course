import * as React from 'react';

import { Page } from '@servicetitan/design-system';

import { UsersGrid } from './users-grid';

export const UsersPage = () =>
    (
        <Page className="flex-auto">
            <UsersGrid/>
        </Page>
    );
