// SPDX-FileCopyrightText: 2023 HH Partners
//
// SPDX-License-Identifier: MIT

import { JSX } from "react";

export type TreeNode = {
    id: string;
    name: string;
    path: string;
    fileSha256?: string;
    selectionStatus: number; // 1 = selected, 0 = deselected, 0.5 = some children selected
    children?: TreeNode[];
};

// A type for handling the deletion of an item from the database
export type DeleteAction = {
    dialogMessage: string | JSX.Element;
    buttonText: string;
    mutation: () => void;
};
