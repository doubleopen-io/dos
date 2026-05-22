// SPDX-FileCopyrightText: 2026 Double Open Oy
//
// SPDX-License-Identifier: MIT

import { useState } from "react";
import { CellContext, RowData } from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const EditableTextTableCell = <TData extends RowData>({
    getValue,
    row,
    column,
    table,
}: CellContext<TData, unknown>) => {
    const initialValue = getValue();
    const value = typeof initialValue === "string" ? initialValue : "";
    const [editedValue, setEditedValue] = useState(value);
    const columnMeta = column.columnDef.meta;
    const tableMeta = table.options.meta;

    const onBlur = (
        event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        tableMeta?.updateData(row.index, column.id, event.target.value);
    };

    if (tableMeta?.selectedRowsForEditing[parseInt(row.id)]) {
        return columnMeta?.type === "textarea" ? (
            <Textarea
                value={editedValue}
                onChange={(event) => setEditedValue(event.target.value)}
                onBlur={onBlur}
                name={column.id}
                aria-label={column.id}
            />
        ) : (
            <Input
                value={editedValue}
                onChange={(event) => setEditedValue(event.target.value)}
                onBlur={onBlur}
                type="text"
                name={column.id}
                aria-label={column.id}
            />
        );
    }

    return (
        <span className={columnMeta?.breakAll ? "break-all" : undefined}>
            {value}
        </span>
    );
};

export default EditableTextTableCell;
