import * as React from 'react';

import { Input } from '@servicetitan/design-system';

import { getEditableCell, EditorProps } from './get-editable-cell';

class PasswordCellEditor extends React.Component<EditorProps<string>> {
    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(event, event.target.value);
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

export const PasswordCell = getEditableCell({
    editor: PasswordCellEditor,
    viewer: () => null,
});
