import { GridCell, GridCellProps } from '@progress/kendo-react-grid';
import * as React from 'react';

import { Button, Dialog } from '@servicetitan/design-system';

import { Confirm, ConfirmationProps } from '../../confirm/confirm';

interface GetEditAndDeleteActionCellParams<T> {
    onEdit?: (dataItem: T) => void;
    onSave?: (dataItem: T) => void;
    onCancel?: (dataItem: T) => void;
    onDelete?: (dataItem: T) => void;
    deleteConfirmation?: boolean;
}

export function getEditAndDeleteActionCell<T>({
    onEdit,
    onSave,
    onCancel,
    onDelete,
    deleteConfirmation = true,
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
                        <DeleteButton
                            onDelete={() => onDelete(dataItem)}
                            deleteConfirmation={deleteConfirmation}
                        />
                    )}
                </td>
            );
        }
    };
}

interface DeleteButtonProps {
    onDelete: () => void;
    deleteConfirmation?: boolean;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
    onDelete,
    deleteConfirmation,
}) =>
    (
        deleteConfirmation
            ? (
                <Confirm onClick={onDelete} confirmation={DeleteConfirmation}>
                    {onClick => (
                        <Button small text negative onClick={onClick}>Delete</Button>
                    )}
                </Confirm>
            )
            : (
                <Button small text negative onClick={onDelete}>Delete</Button>
            )
    );


const DeleteConfirmation: React.FC<ConfirmationProps> = ({ onConfirm, onCancel }) => (
    <Dialog
        open
        onClose={onCancel}
        title="Delete User"
        negative
        onPrimaryActionClick={onConfirm}
        primaryActionName="Delete"
        onSecondaryActionClick={onCancel}
        secondaryActionName="Cancel"
    >Are you sure you want to delete this user?</Dialog>
);
