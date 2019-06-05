import * as React from 'react';

import { Button, ButtonGroup, Form, Link, Stack, Text } from '@servicetitan/design-system';

import * as Styles from './login-page.less'

export const LoginPage = () => {
    const save = console.log; // @todo

    return (
        <Stack alignItems="center" justifyContent="center" className="flex-auto">
            <Stack.Item className={Styles.formContainer}>
                <Form onSubmit={save}>
                    <Text size={5} bold className="ta-center">Login</Text>
                    <Form.Input label="Login" />
                    <Form.Input label="Password" type="password" />

                    <ButtonGroup fullWidth>
                        <Link href="/#/registration" color="primary">Sign up</Link>
                        <Button className="w-50" primary type="submit">Login</Button>
                    </ButtonGroup>
                </Form>
            </Stack.Item>
        </Stack>
    );
};
