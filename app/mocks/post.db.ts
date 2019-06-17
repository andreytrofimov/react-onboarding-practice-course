import { cloneDeep } from '../common/utils/clone-deep';
import { Post } from '../news-page/models/post';
import { John, Lil } from './user.db';

export const Post1: Post = {
    id: 1,
    title: 'Vlog Kinfolk',
    description:
        + 'Lorem ipsum dolor amet williamsburg vlog kinfolk, meditation DIY yr brooklyn pug tousled '
        + 'celiac tofu marfa. Sartorial freegan poke, unicorn mustache VHS stumptown cold-pressed '
        + 'vape leggings beard ugh cornhole fam. Cornhole poutine artisan butcher. Chillwave etsy '
        + 'venmo pitchfork vinyl. La croix mlkshk poke, portland quinoa ethical chartreuse occupy '
        + 'roof party gluten-free lomo marfa. Readymade succulents pabst hell of gochujang '
        + 'sartorial seitan chicharrones humblebrag slow-carb.'
    ,
    authorId: John.id,
    createdAt: new Date('2019-06-01T02:00:00.000Z'),
};

const Post2: Post = {
    id: 2,
    title: 'Synth Narwhal Kickstarter',
    description: ''
        + 'Tattooed PBR&B trust fund synth narwhal kickstarter, man bun craft beer hot chicken '
        + 'street art letterpress. Fixie copper mug deep v distillery, bicycle rights bitters '
        + 'stumptown banjo man braid selfies live-edge. Enamel pin master cleanse plaid prism. '
        + 'Shaman ethical plaid lumbersexual you probably haven\'t heard of them tilde. '
        + 'Brooklyn knausgaard dreamcatcher occupy meggings cornhole bicycle rights church-key '
        + 'live-edge drinking vinegar fanny pack normcore DIY shaman meditation. Cronut banjo '
        + 'church-key aesthetic.'
    ,
    authorId: Lil.id,
    createdAt: new Date('2019-06-10T02:00:00.000Z'),
};

const Post3: Post = {
    id: 3,
    title: 'Ethical Readymade Skateboard',
    description:
        + 'Paleo meggings plaid bitters literally street art etsy 3 wolf moon art party ' 
        + 'chambray church-key kinfolk. Copper mug cardigan mustache cronut. Etsy skateboard ' 
        + 'meditation, tattooed single-origin coffee edison bulb vexillologist af. ' 
        + 'Blog edison bulb four loko kogi meditation ethical readymade skateboard. ' 
        + 'Church-key squid jianbing before they sold out intelligentsia mustache affogato ' 
        + 'brooklyn ramps kale chips knausgaard wayfarers williamsburg. Post-ironic palo santo ' 
        + 'cardigan freegan sartorial.'
    ,
    authorId: Lil.id,
    createdAt: new Date('2019-06-13T02:44:48.588Z'),
};

export const News = [
    Post1,
    Post2,
    Post3,
];

class NewsDB {
    news!: Post[];

    constructor() {
        this.initNews();
    }

    private initNews(): void {
        this.news = News;
    }

    get(): Post[] {
        return cloneDeep(this.news);
    }

    create(data: Post): void {
        const dataClone = cloneDeep(data);

        this.news.push({
            ...dataClone,
            id: this.nextId,
            createdAt: new Date(),
        });
    }

    private get nextId(): number {
        const lastId =
            this.news
                .reduce((max, { id }) => (max < id! ? id! : max), 0)
        ;

        return lastId + 1;
    }

    update(data: Post): Post | undefined {
        const dataClone = cloneDeep(data);

        const [, post] = this._findById(dataClone.id);
        if (!post) {
            return void 0;
        }

        Object.assign(post, dataClone, { id: post.id });

        return cloneDeep(post);
    }

    delete(id: number): boolean {
        const [ index, post ]= this._findById(id);
        if (!post) {
            return false;
        }

        this.news.splice(index, 1);
        return true;
    }

    private _findById(id?: number): [number, Post?] {
        if (id === void 0) {
            return [-1, void 0];
        }

        const i = this.news.findIndex(u => id === u.id);
        return [i, this.news[i]];
    }
}

const instance = new NewsDB();

export { instance as NewsDB };
