// SPDX-FileCopyrightText: 2026 Double Open Oy
//
// SPDX-License-Identifier: MIT

import { CellContext, RowData } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

const EditableBooleanTableCell = <TData extends RowData>({
    getValue,
    row,
    column,
    table,
}: CellContext<TData, unknown>) => {
    const initialValue = getValue();
    const value = typeof initialValue === "boolean" ? initialValue : false;
    const tableMeta = table.options.meta;

    if (tableMeta?.selectedRowsForEditing[parseInt(row.id)]) {
        return (
            <Checkbox
                checked={value}
                onCheckedChange={(newValue) => {
                    tableMeta?.updateData(
                        row.index,
                        column.id,
                        newValue.valueOf() as boolean,
                    );
                }}
                name={column.id}
                aria-label={column.id}
            />
        );
    }

    return <span>{value ? "Yes" : "No"}</span>;
};

export default EditableBooleanTableCell;
