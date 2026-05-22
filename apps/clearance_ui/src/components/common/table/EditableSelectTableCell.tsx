// SPDX-FileCopyrightText: 2026 Double Open Oy
//
// SPDX-License-Identifier: MIT

import { CellContext, RowData } from "@tanstack/react-table";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const EditableSelectTableCell = <TData extends RowData>({
    getValue,
    row,
    column,
    table,
}: CellContext<TData, unknown>) => {
    const initialValue = getValue();
    const value = typeof initialValue === "string" ? initialValue : "";
    const columnMeta = column.columnDef.meta;
    const tableMeta = table.options.meta;

    if (tableMeta?.selectedRowsForEditing[parseInt(row.id)]) {
        return (
            <Select
                value={value}
                onValueChange={(selected) => {
                    tableMeta?.updateData(row.index, column.id, selected);
                }}
                name={column.id}
                aria-label={column.id}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select a value..." />
                </SelectTrigger>
                <SelectContent>
                    {columnMeta?.selectOptions?.map((option) => (
                        <SelectGroup key={option.value}>
                            <SelectItem
                                value={option.value}
                                className="py-0.5 text-xs"
                            >
                                {option.label}
                            </SelectItem>
                            {option.description ? (
                                <SelectLabel className="text-muted-foreground mb-1 ml-5 py-0.5 text-xs font-normal italic">
                                    {option.description}
                                </SelectLabel>
                            ) : null}
                        </SelectGroup>
                    ))}
                </SelectContent>
            </Select>
        );
    }

    return (
        <span className={columnMeta?.breakAll ? "break-all" : undefined}>
            {value}
        </span>
    );
};

export default EditableSelectTableCell;
