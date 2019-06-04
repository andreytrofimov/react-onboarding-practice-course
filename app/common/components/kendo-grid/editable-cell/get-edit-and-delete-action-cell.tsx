import { GridCell, GridCellProps } from '@progress/kendo-react-grid';
import * as React from 'react';

import { Button } from '@servicetitan/design-system';

interface GetEditAndDeleteActionCellParams<T> {
    onEdit?: (dataItem: T) => void;
    onSave?: (dataItem: T) => void;
    onCancel?: (dataItem: T) => void;
    onDelete?: (dataItem: T) => void;
}

export function getEditAndDeleteActionCell<T>({
    onEdit,
    onSave,
    onCancel,
    onDelete,
}: GetEditAndDeleteActionCellParams<T>): React.ComponentType<GridCellProps> {
    return class extends GridCell {
        render() {
            const { rowType } = this.props;
            if (rowType !== 'data') {
                return <GridCell {...this.props} />;
            }

            const { dataItem } = this.props;
            if (dataItem.inEdit) {
                return (
                    <td>
                        {onCancel && (
                            <Button small text onClick={() => onCancel(dataItem)}>Cancel</Button>
                        )}
                        {onSave && (
                            <Button small text primary onClick={() => onSave(dataItem)}>Save</Button>
                        )}
                    </td>
                );
            }

            return (
                <td>
                    {onEdit && (
                        <Button small text primary onClick={() => onEdit(dataItem)}>Edit</Button>
                    )}
                    {onDelete && (
                        <Button small text negative onClick={() => onDelete(dataItem)}>Delete</Button>
                    )}
                </td>
            );
        }
    };
}
