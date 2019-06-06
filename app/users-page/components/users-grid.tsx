import { GridColumn } from '@progress/kendo-react-grid';

import { observer } from 'mobx-react';
import * as React from 'react';

import { getEditAndDeleteActionCell } from '../../common/components/kendo-grid/editable-cell/get-edit-and-delete-action-cell';
import { getSelectCell } from '../../common/components/kendo-grid/editable-cell/get-select-cell';
import { PasswordCell } from '../../common/components/kendo-grid/editable-cell/password-cell';
import { KendoGrid } from '../../common/components/kendo-grid/kendo-grid';
import { InMemoryDataSource, KendoGridState } from '../../common/components/kendo-grid/kendo-grid-state';
import { getEnumValues } from '../../common/utils/form-helpers';
import { Users } from '../../mocks/user';
import { Role, User } from '../../user/models';

@observer
export class UsersGrid extends React.Component {
    private gridState = new KendoGridState<User, User['id']>({
        pageSize: 5,
        idSelector: u => u.id,
    });

    componentDidMount() {
        this.gridState.setDataSource(new InMemoryDataSource(Users));
    }

    SelectRoleCell = getSelectCell(getEnumValues(Role));
    ActionCell = createActionCell(this.gridState);

    render() {
        return (
            <KendoGrid
                gridState={this.gridState}
                selectable
                sortable
                groupable={{ footer: 'visible' }}
            >
                <GridColumn field="id" title="id" filterable={false} editable={false} width="100px" />
                <GridColumn field="login" title="login" width="240px" />
                <GridColumn field="password" title="password" cell={PasswordCell} />
                <GridColumn field="role" title="role" cell={this.SelectRoleCell} />
                <GridColumn title="Actions" cell={this.ActionCell} />
            </KendoGrid>
        );
    }
}

function createActionCell(gridState: KendoGridState<User, User['id']>) {
    return getEditAndDeleteActionCell<User>({
        onEdit: u => gridState.edit(u),
        onSave: u => gridState.saveEdit(u),
        onCancel: u => gridState.cancelEdit(u),
        onDelete: u => gridState.removeFromDataSource(i => i.id === u.id),
    })
}
