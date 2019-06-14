import { User } from '../../common/models/user';

export interface Post {
    id?: number;
    title?: string;
    description?: string;
    authorId?: User['id'];
    createdAt?: Date;
}
