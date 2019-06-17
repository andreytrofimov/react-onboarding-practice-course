import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Button, Layout, Page, Stack } from '@servicetitan/design-system';

import { User } from '../../common/models/user';
import { NewsDB } from '../../mocks/post.db';
import { UsersDB } from '../../mocks/user.db';
import { Post } from '../models/post';
import { EditPostModal } from './edit-post-modal';
import { PostCard } from './post-card';

export const NewsPage: React.FC = observer(() => {
    const onCreate = console.log;
    const onEdit = console.log;
    const onDelete = console.log;

    const getAuthorName = getUserName(UsersDB.get());
    const posts = NewsDB.get().reverse();
    const postCardData = posts.map<[Post, User['login']]>(p => [p, getAuthorName(p.authorId)]);

    return (
        <Page className="flex-auto">
            <Layout type="island">
                <Stack justifyContent="center" className="m-b-3">
                    <Button primary onClick={onCreate}>Create new</Button>
                </Stack>
                <EditPostModal />
                {postCardData.map(([p, a]) => (
                    <div className="m-b-3" key={p.id}>
                        <PostCard
                            post={p}
                            authorName={a}
                            onEdit={() => onEdit(p)}
                            onDelete={() => onDelete(p)}
                        />
                    </div>
                ))}
            </Layout>
        </Page>
    );
});

function getUserName(users: User[]) {
    const entries = users.map<[User['id'], User['login']]>(u => [u.id, u.login]);
    const loginMap = new Map(entries);

    return (id: User['id']) => {
        if (id === void 0) {
            return 'unknown'
        }

        const login = loginMap.get(id);
        return login || 'unknown';
    };
}
