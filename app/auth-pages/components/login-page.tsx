import * as React from 'react';

import { Button, ButtonGroup, Form, Link } from '@servicetitan/design-system';

import { AuthLayout } from './auth-layout';

export const LoginPage = () => {
    const login = console.log; // @todo

    return (
        <AuthLayout title="Login">
            <Form onSubmit={login}>
                <Form.Input label="Login" />
                <Form.Input label="Password" type="password" />

                <ButtonGroup fullWidth>
                    <Link href="/#/register" color="primary">Sign Up</Link>
                    <Button className="w-50" primary type="submit">Login</Button>
                </ButtonGroup>
            </Form>
        </AuthLayout>
    );
};
