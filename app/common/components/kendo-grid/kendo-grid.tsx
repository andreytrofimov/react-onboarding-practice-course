import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    Grid,
    GridCell,
    GridProps,
    GridRowProps,
    GridColumn,
    GridColumnProps,
    GridCellProps,
    GridHeaderCellProps,
    GridColumnMenuFilter
} from '@progress/kendo-react-grid';
import { GridPDFExport } from '@progress/kendo-react-pdf';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { observer } from 'mobx-react';

import { KendoGridState } from './kendo-grid-state';
import { SelectColumnCell, SelectHeaderCell } from './select-cell/select-cell';

import * as classNames from 'classnames';
import * as Styles from './kendo-grid.less';

export interface KendoGridProps<T, TId = any> extends GridProps {
    selectable?: boolean;
    exportable?: boolean;
    hideSelectAll?: boolean;
    exportFileName?: string;
    loading?: boolean;
    gridState: KendoGridState<T, TId>;
    className?: string;
}

@observer
export class KendoGrid extends React.Component<KendoGridProps<any>> {

    private gridState = this.props.gridState;

    private selectColumnCell: React.FC<GridCellProps> = (props: GridCellProps) => {
        if (props.rowType !== 'data') {
            return <GridCell {...props} />
        }

        return (
            <SelectColumnCell
                {...props}
                isRowUnselectable={this.gridState.isRowUnselectable}
            />
        );
    }

    private selectHeaderCell: React.FC<GridHeaderCellProps> = (props: GridHeaderCellProps) => {
        if (this.props.hideSelectAll || this.gridState.singleSelection) {
            return null;
        }

        return (
            <SelectHeaderCell
                {...props}
                isSomeRowsSelected={this.gridState.isSomeRowsSelected}
            />
        );
    }

    rowRender = (row: React.ReactElement, rowProps: GridRowProps) => {
        let result = row;

        if (this.props.detail) {
            if (rowProps.rowType === 'groupHeader') {
                result = React.cloneElement(row, {
                    children: row.props.children.map(
                        (child: React.ReactElement) => React.cloneElement(child, {
                            columnsCount: child.props.columnsCount - 1,
                        })
                    )
                });
            }
        }

        return (
            this.props.rowRender
                ? this.props.rowRender(result, rowProps)
                : result
        );
    }

    private grid = () => (
        <Grid
            {...this.props}
            data={[...this.gridState.data]}
            rowRender={this.rowRender}
            onItemChange={this.gridState.handleItemChange}
            editField="inEdit"
            filter={this.gridState.filter}
            onFilterChange={this.gridState.handleFilterChange}
            group={[...this.gridState.group]}
            onGroupChange={this.gridState.handleGroupChange}
            onExpandChange={this.gridState.handleExpandChange}
            expandField="expanded"
            sort={[...this.gridState.sort]}
            onSortChange={this.gridState.handleSortChange}
            onHeaderSelectionChange={this.gridState.handleHeaderSelectionChange}
            onSelectionChange={this.gridState.handleSelectionChange}
            selectedField="selected"
            pageable={this.gridState.pageSize > 0}
            pageSize={this.gridState.pageSize > 0 ? this.gridState.pageSize : undefined}
            skip={this.gridState.skip}
            onPageChange={this.gridState.handlePageChange}
            total={this.gridState.filteredCount}
        >
            {this.props.selectable &&
                <GridColumn
                    field="selected"
                    width="50px"
                    filterable={false}
                    resizable={false}
                    headerSelectionValue={this.gridState.isAllRowsSelected}
                    headerCell={this.selectHeaderCell}
                    cell={this.selectColumnCell}
                />
            }
            {React.Children.map(
                this.props.children,
                (child) => {
                    if (!React.isValidElement(child) || (child as React.ReactElement).type !== GridColumn) {
                        return child;
                    }

                    const column = child as React.ReactElement<GridColumnProps>;

                    const { field = '' } = column.props;
                    const isFiltersActive = GridColumnMenuFilter.active(
                        field,
                        this.gridState.filter
                    );

                    return React.cloneElement(column, {
                        headerClassName: classNames(
                            column.props.headerClassName,
                            isFiltersActive && Styles.activeFilter
                        )
                    });
                }
            )}
        </Grid>
    )

    render() {
        const grid = this.grid();
        return (
            <div
                className={classNames(
                    Styles.grid,
                    this.props.detail && Styles.hideHierarchyCell,
                    this.props.className
                )}
            >
                {grid}
                {this.props.loading && <LoadingPanel />}
                {this.props.exportable &&
                    <>
                        <GridPDFExport
                            ref={this.gridState.setGridPdfExportRef}
                            fileName={this.props.exportFileName}
                        >
                            {this.props.children}
                            {grid}
                        </GridPDFExport>
                        <ExcelExport
                            ref={this.gridState.setGridExcelExportRef}
                            fileName={this.props.exportFileName}
                        >
                            {this.props.children}
                        </ExcelExport>
                    </>
                }
            </div>
        );
    }
}

const LoadingPanel: React.FC = () => {
    const loadingPanel = (
        <div className="k-loading-mask">
            <div className="k-loading-image" />
            <div className="k-loading-color" />
        </div>
    );

    const gridContent = document && document.querySelector('.k-widget.k-grid');
    return gridContent ? ReactDOM.createPortal(loadingPanel, gridContent) : loadingPanel;
};
