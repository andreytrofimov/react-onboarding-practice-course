import { GridColumn } from '@progress/kendo-react-grid';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { Prompt } from 'react-router';

import { provide, useDependencies } from '@servicetitan/react-ioc';

import { ErrorMessage } from '../../common/components/error-message';
import { getEditAndDeleteActionCell } from '../../common/components/kendo-grid/editable-cell/get-edit-and-delete-action-cell';
import { getSelectCell } from '../../common/components/kendo-grid/editable-cell/get-select-cell';
import { PasswordCell } from '../../common/components/kendo-grid/editable-cell/password-cell';
import { StandardColumnMenuFilter } from '../../common/components/kendo-grid/filters/column-menu-filters';
import { KendoGrid } from '../../common/components/kendo-grid/kendo-grid';
import { Role } from '../../common/models/role';
import { User } from '../../common/models/user';
import { getEnumValues } from '../../common/utils/form-helpers';
import { UserApi } from '../api/user.api';
import { UsersStore } from '../store/users.store';

const UsersGrid_ = observer(() => {
    const store = useUsersStore();

    const ActionCell = useActionCellMemo(store);

    return (
        <React.Fragment>
            <Prompt
                when={store.inEdit}
                message="/users"
            />
            <ErrorMessage msg={store.serverError} />
            <KendoGrid
                gridState={store.gridState}
                sortable
                groupable
            >
                <GridColumn
                    field="id"
                    title="id"
                    editable={false}
                    groupable={false}
                    width="100px"
                />
                <GridColumn
                    field="login"
                    title="login"
                    width="240px"
                    columnMenu={StandardColumnMenuFilter}
                    groupable={false}
                />
                <GridColumn
                    field="password"
                    title="password"
                    cell={PasswordCell}
                    sortable={false}
                    groupable={false}
                />
                <GridColumn
                    field="role"
                    title="role"
                    cell={SelectRoleCell}
                    columnMenu={StandardColumnMenuFilter}
                />
                <GridColumn
                    title="Actions"
                    cell={ActionCell}
                    sortable={false}
                    groupable={false}
                />
            </KendoGrid>
        </React.Fragment>
    );
});

export const UsersGrid: typeof UsersGrid_ = provide({
    singletons: [
        UserApi,
        UsersStore,
    ],
})(UsersGrid_);

function useUsersStore(): UsersStore {
    const [store] = useDependencies(UsersStore);

    React.useEffect(() => { store.load() }, []);

    return store;
}

const SelectRoleCell = getSelectCell(getEnumValues(Role));

function useActionCellMemo(s: UsersStore) {
    return React.useMemo(() => getEditAndDeleteActionCell<User>({
        onEdit: s.edit,
        onSave: s.saveEdit,
        onCancel: s.cancelEdit,
        onDelete: s.delete,
    }), []);
}
