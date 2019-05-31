import * as React from 'react';

import { Input } from '@servicetitan/design-system';

import { DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';

import { getEditableCell, EditorProps } from './get-editable-cell';

export function getPasswordCell() {
    class PasswordCell extends React.Component<EditorProps<string>> {
        handleChange = (event: DropDownListChangeEvent) => {
            this.props.onChange(event.syntheticEvent, event.target.value);
        }

        render() {
            return (
                <Input
                    type="password"
                    value={this.props.value}
                    onChange={this.handleChange}
                    style={{
                        width: '100%',
                        boxSizing: 'border-box',
                    }}
                />
            );
        }
    }

    return getEditableCell({
        editor: PasswordCell,
        viewer: () => null,
    });
} 
