import { GridColumn } from '@progress/kendo-react-grid';

import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useEffect, useMemo } from 'react';

import { getEditAndDeleteActionCell } from '../../common/components/kendo-grid/editable-cell/get-edit-and-delete-action-cell';
import { getSelectCell } from '../../common/components/kendo-grid/editable-cell/get-select-cell';
import { PasswordCell } from '../../common/components/kendo-grid/editable-cell/password-cell';
import { KendoGrid } from '../../common/components/kendo-grid/kendo-grid';
import { InMemoryDataSource, KendoGridState } from '../../common/components/kendo-grid/kendo-grid-state';
import { getEnumValues } from '../../common/utils/form-helpers';
import { Users } from '../../mocks/user';
import { Role, User } from '../../user/models';

type UsersGridState = KendoGridState<User, User['id']>;

export const UsersGrid = observer(() => {
    const gridState = useUsersGridState();

    const ActionCell = useActionCellMemo(gridState);

    return (
        <KendoGrid
            gridState={gridState}
            selectable
            sortable
            groupable={{ footer: 'visible' }}
        >
            <GridColumn field="id" title="id" filterable={false} editable={false} width="100px" />
            <GridColumn field="login" title="login" width="240px" />
            <GridColumn field="password" title="password" cell={PasswordCell} />
            <GridColumn field="role" title="role" cell={SelectRoleCell} />
            <GridColumn title="Actions" cell={ActionCell} />
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

    const gridState = useMemo(factory, []);

    useEffect(() => {
        gridState.setDataSource(new InMemoryDataSource(Users));
    }, []);

    return gridState;
}

const SelectRoleCell = getSelectCell(getEnumValues(Role));

function useActionCellMemo(gridState: UsersGridState) {
    return useMemo(() => getEditAndDeleteActionCell<User>({
        onEdit: u => gridState.edit(u),
        onSave: u => gridState.saveEdit(u),
        onCancel: u => gridState.cancelEdit(u),
        onDelete: u => gridState.removeFromDataSource(i => i.id === u.id),
    }), []);
}

