import { action, computed, observable, runInAction } from 'mobx';

import { inject, injectable } from '@servicetitan/react-ioc';

import { User } from '../../common/models/user';
import { AuthStore } from '../../common/stores/auth.store';
import { UserApi } from '../../users-page/api/user.api';
import { NewsApi } from '../api/news.api';
import { Post } from '../models/post';
import { EditPostStore } from './edit-post.store';

export type PostCardData = [Post, User['login']];

@injectable()
export class NewsStore {
    @observable
    editPostStore?: EditPostStore;

    constructor(
        @inject(UserApi) private userApi: UserApi,
        @inject(NewsApi) private newsApi: NewsApi,
        @inject(AuthStore) private authStore: AuthStore,
    ) {
    }

    @observable
    serverErrors: string[] = [];

    @observable
    private users?: User[];

    @observable
    private news?: Post[];

    @computed
    get postCardData(): PostCardData[] | undefined {
        if (!this.users || !this.news) {
            return void 0;
        }

        const getAuthorName = getUserName(this.users);
        return (
            this.news
                .reverse()
                .map<PostCardData>(p => [p, getAuthorName(p.authorId)])
        );
    }

    @action
    update = async () => {
        this.serverErrors = [];

        await Promise.all([
            this.updateUsers(),
            this.updateNews(),
        ]);
    };

    @action
    private async updateUsers() {
        this.users = void 0;
        const r = await this.userApi.getAll();
        if (r.status !== 200) {
            runInAction(() => this.serverErrors.push(r.statusText));
        }

        runInAction(() => this.users = r.data);
    }

    @action
    private async updateNews() {
        this.news = void 0;
        const r = await this.newsApi.getAll();
        if (r.status !== 200) {
            runInAction(() => this.serverErrors.push(r.statusText));
        }

        runInAction(() => this.news = r.data);
    }

    onCreate = () => this.onEdit({ authorId: this.authStore.getUser()!.id });

    @action
    onEdit = async (post: Post) => {
        this.editPostStore = new EditPostStore(this.newsApi, post);
        const r = await this.editPostStore.result;
        runInAction(() => {
            if (r) {
                if (post.id === void 0) {
                    this.news!.push(r);
                } else {
                    const index = this.news!.findIndex(p => p.id === post.id);
                    this.news!.splice(index, 1, r);
                }
            }
            this.editPostStore = void 0;
        });
    };

    @action
    onDelete = async (post: Post) => {
        const r = await this.newsApi.delete(post.id!);

        if (r.status !== 200) {
            runInAction(() => this.serverErrors = [r.statusText]);
            return;
        }

        runInAction(() => {
            const index = this.news!.findIndex(p => p.id === post.id);
            this.news!.splice(index, 1);
        });
    };
}

function getUserName(users: User[]) {
    const entries = users.map<[User['id'], User['login']]>(u => [u.id, u.login]);
    const idToLoginMap = new Map(entries);

    return (id: User['id']): string => {
        if (id === void 0) {
            return 'unknown'
        }

        return idToLoginMap.get(id) || 'unknown';
    };
}
