import * as React from 'react';

import { Stack, Text } from '@servicetitan/design-system';

import * as Styles from './auth-layout.less'

interface AuthLayoutProps {
    title: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) =>
    (
        <Stack alignItems="center" justifyContent="center" className="flex-auto">
            <Stack.Item className={Styles.content}>
                <Text size={5} bold className="ta-center">{title}</Text>
                {children}
            </Stack.Item>
        </Stack>
    );
