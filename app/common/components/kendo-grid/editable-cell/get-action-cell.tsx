import * as React from 'react';

import { GridCell, GridCellProps } from '@progress/kendo-react-grid';

export type ActionsComponent = React.ComponentType<GridCellProps>;

interface GetActionCellParams {
    actions?: ActionsComponent;
}

export function getActionCell({ actions: Actions }: GetActionCellParams) {
    return class extends GridCell {
        render() {
            if (this.props.rowType !== "data") {
                return null;
            }

            return (
                <td>
                    {Actions && <Actions {...this.props} />}
                </td>
            );
        }
    };
}
