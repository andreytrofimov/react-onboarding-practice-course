import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { Button, Layout, Page, Stack } from '@servicetitan/design-system';
import { provide, useDependencies } from '@servicetitan/react-ioc';

import { NewsApi } from '../api/news.api';
import { EditPostStore } from '../stores/edit-post.store';
import { NewsStore } from '../stores/news.store';
import { EditPostModal } from './edit-post-modal';
import { PostCard } from './post-card';

const NewsPage_: React.FC = observer(() => {
    const { postCardData, onCreate, onEdit, onDelete, editPostStore } = useNewsStore();

    return (
        <Page className="flex-auto">
            <Stack justifyContent="center">
                <Button primary onClick={onCreate}>Create new</Button>
            </Stack>
            <Layout type="island">
                <EditPostModal store={editPostStore} />
                {postCardData && (
                    postCardData.map(([p, a]) => (
                        <Layout.Section key={p.id}>
                            <PostCard
                                post={p}
                                authorName={a}
                                onEdit={() => onEdit(p)}
                                onDelete={() => onDelete(p)}
                            />
                        </Layout.Section>
                    ))
                )}
            </Layout>
        </Page>
    );
});

export const NewsPage: typeof NewsPage_ = provide({
    singletons: [
        NewsApi,
        NewsStore,
        EditPostStore,
    ],
})(NewsPage_);

function useNewsStore(): NewsStore {
    const [store] = useDependencies(NewsStore);
    React.useEffect(() => { store.update() }, []);
    return store;
}
