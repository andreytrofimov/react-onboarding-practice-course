import * as React from 'react';

import { Button, Form, Link, Stack, Text } from '@servicetitan/design-system';

import * as Styles from './login-page.less'

export const LoginPage = () => {
    const save = console.log; // @todo

    return (
        <Stack alignItems="center" justifyContent="center" className="flex-auto">
            <Stack.Item className={Styles.formContainer}>
                <Form onSubmit={save}>
                    <Text size={5} bold className={Styles.header}>Login</Text>
                    <Form.Input label="Login" />
                    <Form.Input label="Password" type="password" />

                    <Stack alignItems="center" justifyContent="space-between">
                        <Link href="/#/registration" color="primary">Sign up</Link>
                        <Button className={Styles.loginButton} primary type="submit">Login</Button>
                    </Stack>
                </Form>
            </Stack.Item>
        </Stack>
    );
};
