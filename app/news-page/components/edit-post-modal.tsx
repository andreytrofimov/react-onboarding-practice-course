import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Button, Form, Modal } from '@servicetitan/design-system';

import { Label } from '../../common/components/label/label';
import { EditPostStore } from '../stores/edit-post.store';

interface EditPostModalProps {
    store?: EditPostStore;
}

export const EditPostModal: React.FC<EditPostModalProps> = observer(({ store }) => {
    if (!store) {
        return null;
    }

    const { post, onCancel, onSave, form } = store;
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
