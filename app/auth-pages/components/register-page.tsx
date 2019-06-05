import { Button, ButtonGroup, Form, Link } from '@servicetitan/design-system';
import * as React from 'react';

import { enumToOptions } from '../../common/utils/form-helpers';
import { Role } from '../../user/models';

import { AuthLayout } from './auth-layout';

export const RegisterPage = () => {
    const register = console.log; // @todo

    return (
        <AuthLayout title="Register">
            <Form onSubmit={register}>
                <Form.Input label="Login" />
                <Form.Input label="Password" type="password" />
                <Form.Input label="Password Confirmation" type="password" />
                <Form.Select
                    label="Role"
                    options={enumToOptions(Role)}
                    defaultValue={Role.Public}
                />

                <ButtonGroup fullWidth>
                    <Link href="/#/login" color="primary">Sign In</Link>
                    <Button className="w-50" primary type="submit">Create</Button>
                </ButtonGroup>
            </Form>
        </AuthLayout>
    );
};
