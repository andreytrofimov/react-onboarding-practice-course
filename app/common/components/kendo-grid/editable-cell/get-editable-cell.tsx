import * as React from 'react';

import { GridCell, GridCellProps } from '@progress/kendo-react-grid';

export interface EditorProps<T> {
    value: T;
    onChange(syntheticEvent: React.SyntheticEvent, value: T): void;
}

interface GetEditableCellParams<T> {
    viewer?: React.ComponentType<GridCellProps>;
    editor: React.ComponentType<EditorProps<T>>;
}

export function getEditableCell<T>({ viewer, editor }: GetEditableCellParams<T>) {
    return class extends GridCell {
        handleChange = (syntheticEvent: React.SyntheticEvent, value: T) => {
            if (this.props.onChange) {
                this.props.onChange({
                    value,
                    syntheticEvent,
                    field: this.props.field,
                    dataItem: this.props.dataItem
                });
            }
        }

        render() {
            if (this.props.rowType !== "data") {
                return <GridCell {...this.props} />;
            }
            
            if (!this.props.field || !this.props.dataItem.inEdit) {
                if (!viewer) {
                    return <GridCell {...this.props} />;
                }

                const Viewer = viewer;
                return (
                    <td>
                        <Viewer {...this.props} />
                    </td>
                );
            }

            const value = this.props.dataItem[this.props.field] as T;

            const Editor = editor;
            return (
                <td style={{ overflow: 'visible' }}>
                    <Editor value={value} onChange={this.handleChange} />
                </td>
            );
        }
    };
}
