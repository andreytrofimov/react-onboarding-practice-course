import * as moment from 'moment';
import * as React from 'react';

import { Avatar, Card, Dialog, Dropdown, Icon, Stack, Text } from '@servicetitan/design-system';

import { Confirm, ConfirmationProps } from '../../common/components/confirm/confirm';
import { User } from '../../common/models/user';
import { Post } from '../models/post';

interface PostProps {
    post: Post;
    authorName: User['login'];
    onEdit: () => void;
    onDelete: () => void;
}

export const PostCard: React.FC<PostProps> = ({ post, authorName, onEdit, onDelete }) => {
    return (
        <Card>
            <Card.Section>
                <Text bold size={3} className="m-0 m-b-1">{post.title}</Text>
                <Text size={2} className="m-0">{post.description}</Text>
            </Card.Section>
            <Card.Section light>
                <Stack alignment="center" justifyContent="flex-start">
                    <Avatar name={authorName} autoColor className="m-r-1"/>
                    <Stack.Item fill>
                        <Text bold size={2} className="m-0">{authorName}</Text>
                        <Text size={1} className="m-0">{fromNow(post.createdAt!)}</Text>
                    </Stack.Item>
                    <Stack.Item>
                        <Dropdown icon={<Icon size={24} name="more_horiz" />}>
                            <Dropdown.Menu>
                                <Dropdown.Item text="Edit" onClick={onEdit} />
                                <DeleteDropdownItem onDelete={onDelete} />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Stack.Item>
                </Stack>
            </Card.Section>
        </Card>
    );
};

function fromNow(date: Date) {
    return moment(date).fromNow();
}

interface DeleteDropdownItemProps {
    onDelete: () => void;
}

const DeleteDropdownItem: React.FC<DeleteDropdownItemProps> = ({
    onDelete,
}) =>
    (
        <Confirm onClick={onDelete} confirmation={DeleteConfirmation}>
            {onClick => (
                <Dropdown.Item text="Delete" onClick={onClick} />
            )}
        </Confirm>
    );


const DeleteConfirmation: React.FC<ConfirmationProps> = ({ onConfirm, onCancel }) =>
    (
        <Dialog
            open
            onClose={onCancel}
            title="Delete Post"
            negative
            onPrimaryActionClick={onConfirm}
            primaryActionName="Delete"
            onSecondaryActionClick={onCancel}
            secondaryActionName="Cancel"
        >Are you sure you want to delete this post?</Dialog>
    );
