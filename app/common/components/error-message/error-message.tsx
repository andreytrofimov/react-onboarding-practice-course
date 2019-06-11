import * as React from 'react';

import { Banner } from '@servicetitan/design-system';

interface ErrorMessageProps {
    msg?: string,
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ msg }) => (
    !msg ? null : (
        <Banner status="critical" className="m-t-3 m-b-3" title={msg} />
    )
);
