import { Role } from '../common/models/role';
import { User } from '../common/models/user';
import { cloneDeep } from '../common/utils/clone-deep';

export const Dave = {
    id: 1,
    login: 'dave',
    password: 'qweqweqwe',
    role: Role.Admin,
};

export const Lil = {
    id: 2,
    login: 'lil',
    password: 'qweqweqwe',
    role: Role.Operator,
};

export const John = {
    id: 3,
    login: 'john',
    password: 'qweqweqwe',
    role: Role.Public,
};

const DefaultUsers = [
    Dave,
    Lil,
    John,
];

class UsersDB {
    users!: User[];

    constructor() {
        this.initUsers();
    }

    private initUsers(): void {
        this.users = DefaultUsers;
    }

    get(): User[] {
        return cloneDeep(this.users);
    }

    create(data: User): boolean {
        const dataClone = cloneDeep(data);

        const { login } = data;

        const isLoginUsed = !!this._findByLogin(login);
        if (isLoginUsed) {
            return false;
        }

        this.users.push({
            ...dataClone,
            id: this.nextId,
        });
        return true;
    }

    private get nextId(): number {
        const lastId =
            this.users
                .reduce((max, { id }) => (max < id! ? id! : max), 0)
        ;

        return lastId + 1;
    }

    update(data: User): User | undefined {
        const dataClone = cloneDeep(data);

        const [, user] = this._findById(dataClone.id);
        if (!user) {
            return void 0;
        }

        Object.assign(user, dataClone, { id: user.id });

        return cloneDeep(user);
    }

    delete(id: number): boolean {
        const [ index, user ]= this._findById(id);
        if (!user) {
            return false;
        }

        this.users.splice(index, 1);
        return true;
    }

    private _findById(id?: number): [number, User?] {
        if (id === void 0) {
            return [-1, void 0];
        }

        const i = this.users.findIndex(u => id === u.id);
        return [i, this.users[i]];
    }

    findByLogin(login: string): User | undefined {
        return cloneDeep(this._findByLogin(login));
    }

    isLoginAlreadyInUse(login: string): boolean {
        return !!this._findByLogin(login);
    }

    private _findByLogin(login?: string) {
        if (!login) {
            return void 0;
        }

        const lcLogin = login.toLowerCase();
        return this.users.find(u => u.login!.toLowerCase() === lcLogin);
    }
}

const instance = new UsersDB();

export { instance as UsersDB };
