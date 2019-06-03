import * as React from 'react';

import { observer } from 'mobx-react';
import { observable, action } from 'mobx';

import { Stack, Button } from '@servicetitan/design-system';
import { GridColumn } from '@progress/kendo-react-grid';
import { PasswordCell } from './editable-cell/password-cell';

import { KendoGridState, InMemoryDataSource } from './kendo-grid-state';

import { KendoGrid } from './kendo-grid';
import { CurrencyRangeColumnMenuFilter, DateRangeColumnMenuFilter } from './filters/range-filter/range-filter';
import { StandardColumnMenuFilter } from './filters/column-menu-filters';
import { getSelectCell } from './editable-cell/get-select-cell';

import { getEnumValues } from '../../utils/form-helpers';

enum UserRole {
    Unspecified = 'Unspecified',
    Technician = 'Technician',
    GeneralOffice = 'GeneralOffice',
    Admin = 'Admin',
    Owner = 'Owner',
}

interface Product {
    ProductID: number;
    ProductName: string;
    SupplierID: number;
    CategoryID: number;
    QuantityPerUnit: string;
    UnitPrice: number;
    UnitsInStock: number;
    UnitsOnOrder: Date;
    Discontinued: boolean;
    Password?: string;
    AvailableFor?: UserRole;
}

const products: Product[] = [{
    ProductID: 1,
    ProductName: 'Chai',
    SupplierID: 1,
    CategoryID: 1,
    QuantityPerUnit: '10 boxes x 20 bags',
    UnitPrice: 18.0000,
    UnitsInStock: 39,
    UnitsOnOrder: new Date('1/11/2019'),
    Discontinued: false,
    AvailableFor: UserRole.Admin
}, {
    ProductID: 2,
    ProductName: 'Chang',
    SupplierID: 1,
    CategoryID: 1,
    QuantityPerUnit: '24 - 12 oz bottles',
    UnitPrice: 19.0000,
    UnitsInStock: 17,
    UnitsOnOrder: new Date('2/11/2019'),
    Discontinued: false
}, {
    ProductID: 3,
    ProductName: 'Aniseed Syrup',
    SupplierID: 1,
    CategoryID: 2,
    QuantityPerUnit: '12 - 550 ml bottles',
    UnitPrice: 10.0000,
    UnitsInStock: 13,
    UnitsOnOrder: new Date('3/11/2019'),
    Discontinued: false,
    AvailableFor: UserRole.Owner
}, {
    ProductID: 4,
    ProductName: 'Chef Anton\'s Cajun Seasoning',
    SupplierID: 2,
    CategoryID: 2,
    QuantityPerUnit: '48 - 6 oz jars',
    UnitPrice: 22.0000,
    UnitsInStock: 53,
    UnitsOnOrder: new Date('4/11/2019'),
    Discontinued: false
}, {
    ProductID: 5,
    ProductName: 'Chef Anton\'s Gumbo Mix',
    SupplierID: 2,
    CategoryID: 2,
    QuantityPerUnit: '36 boxes',
    UnitPrice: 21.3500,
    UnitsInStock: 0,
    UnitsOnOrder: new Date('5/11/2019'),
    Discontinued: true,
    AvailableFor: UserRole.GeneralOffice
}, {
    ProductID: 6,
    ProductName: 'Grandma\'s Boysenberry Spread',
    SupplierID: 3,
    CategoryID: 2,
    QuantityPerUnit: '12 - 8 oz jars',
    UnitPrice: 25.0000,
    UnitsInStock: 120,
    UnitsOnOrder: new Date('6/11/2019'),
    Discontinued: false
}, {
    ProductID: 7,
    ProductName: 'Uncle Bob\'s Organic Dried Pears',
    SupplierID: 3,
    CategoryID: 7,
    QuantityPerUnit: '12 - 1 lb pkgs.',
    UnitPrice: 30.0000,
    UnitsInStock: 15,
    UnitsOnOrder: new Date('7/11/2019'),
    Discontinued: false
}, {
    ProductID: 8,
    ProductName: 'Northwoods Cranberry Sauce',
    SupplierID: 3,
    CategoryID: 2,
    QuantityPerUnit: '12 - 12 oz jars',
    UnitPrice: 40.0000,
    UnitsInStock: 6,
    UnitsOnOrder: new Date('8/11/2019'),
    Discontinued: false
}, {
    ProductID: 9,
    ProductName: 'Mishi Kobe Niku',
    SupplierID: 4,
    CategoryID: 6,
    QuantityPerUnit: '18 - 500 g pkgs.',
    UnitPrice: 97.0000,
    UnitsInStock: 29,
    UnitsOnOrder: new Date('9/11/2019'),
    Discontinued: true
}, {
    ProductID: 10,
    ProductName: 'Ikura',
    SupplierID: 4,
    CategoryID: 8,
    QuantityPerUnit: '12 - 200 ml jars',
    UnitPrice: 31.0000,
    UnitsInStock: 31,
    UnitsOnOrder: new Date('10/11/2019'),
    Discontinued: false
}];

@observer
export class GridExample extends React.Component {
    private gridState = new KendoGridState({
        pageSize: 5,
        idSelector: (item: Product) => item.ProductID,
        isRowUnselectable: (item: Product) => item.Discontinued
    });

    @observable inEdit = false;

    componentDidMount() {
        this.gridState.setDataSource(new InMemoryDataSource(products));
    }

    @action
    handleEditClick = () => {
        this.gridState.editAll();
        this.inEdit = true;
    }

    @action
    handleSaveClick = () => {
        this.gridState.saveEditAll();
        this.inEdit = false;
    }

    @action
    handleCancelClick = () => {
        this.gridState.cancelEditAll();
        this.inEdit = false;
    }

    render() {
        return (
            <React.Fragment>
                <Stack justifyContent="flex-end" className="m-b-2">
                    {!this.inEdit ?
                        (
                            <Button small primary onClick={this.handleEditClick}>
                                Edit
                            </Button>
                        ) : (
                            <React.Fragment>
                                <Button small onClick={this.handleCancelClick} className="m-r-2">
                                    Cancel
                                </Button>
                                <Button small primary onClick={this.handleSaveClick}>
                                    Save
                                </Button>
                            </React.Fragment>
                        )
                    }
                </Stack>

                <KendoGrid
                    gridState={this.gridState}
                    selectable
                    sortable
                >
                    <GridColumn field="ProductID" title="ID" filterable={false} editable={false} width="100px" />
                    <GridColumn field="ProductName" title="Product Name" width="240px" columnMenu={StandardColumnMenuFilter} />
                    <GridColumn field="UnitsOnOrder" title="First Ordered On" filter="date" editor="date" format="{0:d}" columnMenu={DateRangeColumnMenuFilter} />
                    <GridColumn field="UnitPrice" title="Unit Price" filter="numeric" editor="numeric" format="{0:c}" columnMenu={CurrencyRangeColumnMenuFilter} />
                    <GridColumn field="AvailableFor" title="Available For" cell={getSelectCell(getEnumValues(UserRole))} />
                    <GridColumn field="Password" title="Password" cell={PasswordCell} />
                </KendoGrid>
            </React.Fragment>
        );
    }
}
