import { FormState } from 'formstate';
import { action, observable } from 'mobx';

import { formStateToJS, InputFieldState, TextAreaFieldState } from '../../common/utils/form-helpers';
import { FormValidators } from '../../common/utils/form-validators';
import { NewsApi } from '../api/news.api';
import { Post } from '../models/post';

export class EditPostStore {
    result: Promise<Post | undefined>;
    private close!: (saved?: Post) => void;

    @observable
    serverError = '';

    @observable
    post: Post;

    form: ReturnType<typeof EditPostStore.createForm>;

    constructor(
        private newsApi: NewsApi,
        post: Post,
    ) {
        this.post = post;
        this.form = EditPostStore.createForm(post);
        this.result = new Promise(r => this.close = r)
    }

    private static createForm(post: Post) {
        return new FormState({
            title: new InputFieldState(post.title).validators(
                FormValidators.required,
            ),
            description: new TextAreaFieldState(post.description).validators(
                FormValidators.required,
            ),
        });
    }

    @action
    onSave = async () => {
        this.serverError = '';
        const res = await this.form.validate();
        if (res.hasError) {
            return;
        }

        const data: Post = {
            ...this.post,
            ...formStateToJS(this.form),
        };

        const r = data.id === void 0
            ? await this.newsApi.create(data)
            : await this.newsApi.edit(data)
        ;

        if (r.status !== 200) {
            this.serverError = r.statusText;
            return;
        }

        this.close(r.data)
    };

    onCancel = () => {
        this.close();
    };
}
