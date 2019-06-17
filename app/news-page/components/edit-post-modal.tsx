import { FormState } from 'formstate';
import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Button, Form, Modal } from '@servicetitan/design-system';

import { Label } from '../../common/components/label/label';
import { InputFieldState, TextAreaFieldState } from '../../common/utils/form-helpers';
import { FormValidators } from '../../common/utils/form-validators';
import { Post } from '../models/post';

function useStore() {
    function factory() {
        let post: Post | undefined;

        return {
            form: post && new FormState({
                title: new InputFieldState(post!.title).validators(
                    FormValidators.required,
                ),
                description: new TextAreaFieldState(post!.description).validators(
                    FormValidators.required,
                ),
            }),
            post,
            onCancel: console.log,
            onSave: console.log,
        };
    }

    return React.useMemo(factory, []);
}

export const EditPostModal: React.FC = observer(() => {
    const { post, onCancel, onSave, form } = useStore();
    if (!form || !post) {
        return null;
    }

    const { title, description } = form.$;

    return (
        <Modal
            open
            onClose={onCancel}
            closable
            title={post.id ? 'Edit Post' : 'Create Post'}
            footer={(
                <React.Fragment>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button primary onClick={onSave}>Save</Button>
                </React.Fragment>
            )}
            footerAlign="space-between"
        >
            <Form>
                <Form.Input
                    label={(
                        <Label
                            label="Title"
                            hasError={title.hasError}
                            error={title.error}
                        />
                    )}
                    value={title.value}
                    onChange={title.onChangeHandler}
                    error={title.hasError}
                />
                <Form.TextArea
                    label={(
                        <Label
                            label="Description"
                            hasError={description.hasError}
                            error={description.error}
                        />
                    )}
                    value={description.value}
                    onChange={description.onChangeHandler}
                    error={description.hasError}
                />
            </Form>
        </Modal>
    );
});
