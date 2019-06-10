import { GridColumn } from '@progress/kendo-react-grid';

import { observer } from 'mobx-react-lite';
import * as React from 'react';

import { getEditAndDeleteActionCell } from '../../common/components/kendo-grid/editable-cell/get-edit-and-delete-action-cell';
import { getSelectCell } from '../../common/components/kendo-grid/editable-cell/get-select-cell';
import { PasswordCell } from '../../common/components/kendo-grid/editable-cell/password-cell';
import { StandardColumnMenuFilter } from '../../common/components/kendo-grid/filters/column-menu-filters';
import { KendoGrid } from '../../common/components/kendo-grid/kendo-grid';
import { InMemoryDataSource, KendoGridState } from '../../common/components/kendo-grid/kendo-grid-state';
import { Role } from '../../common/models/role';
import { User } from '../../common/models/user';
import { getEnumValues } from '../../common/utils/form-helpers';
import { UsersDB } from '../../mocks/user.db';

type UsersGridState = KendoGridState<User, User['id']>;

export const UsersGrid = observer(() => {
    const gridState = useUsersGridState();

    const ActionCell = useActionCellMemo(gridState);

    return (
        <KendoGrid
            gridState={gridState}
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
    );
});

function useUsersGridState(): UsersGridState {
    function factory() {
        return new KendoGridState<User, User['id']>({
            pageSize: 5,
            idSelector: u => u.id,
        });
    }

    const gridState = React.useMemo(factory, []);

    React.useEffect(() => {
        gridState.setDataSource(new InMemoryDataSource(UsersDB.get()));
    }, []);

    return gridState;
}

const SelectRoleCell = getSelectCell(getEnumValues(Role));

function useActionCellMemo(gridState: UsersGridState) {
    return React.useMemo(() => getEditAndDeleteActionCell<User>({
        onEdit: u => gridState.edit(u),
        onSave: u => gridState.saveEdit(u),
        onCancel: u => gridState.cancelEdit(u),
        onDelete: u => gridState.removeFromDataSource(i => i.id === u.id),
    }), []);
}

