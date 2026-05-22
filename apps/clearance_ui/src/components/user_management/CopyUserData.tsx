// SPDX-FileCopyrightText: 2023 Double Open Oy
//
// SPDX-License-Identifier: MIT

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type CopyUserDataProps = {
    copyContent: string;
};

const CopyUserData = ({ copyContent }: CopyUserDataProps) => {
    const [copiedContent, setCopiedContent] = useState<string | null>(null);
    const copied = copiedContent === copyContent;

    return (
        <div>
            <Separator />
            <p className="py-4 font-semibold">New user created:</p>
            <div className="flex flex-row">
                <Textarea value={copyContent} rows={5} readOnly />

                <CopyToClipboard text={copyContent}>
                    <Button
                        size="sm"
                        className={cn("ml-2", copied ? "p-3" : "px-3")}
                        onClick={() => setCopiedContent(copyContent)}
                        variant={copied ? "success" : "outline"}
                    >
                        <span className="sr-only">Copy</span>
                        <Copy
                            className={cn(
                                "h-4 w-4",
                                copied ? "hidden" : "visible",
                            )}
                        />
                        <div
                            className={cn(
                                "flex flex-row",
                                copied ? "visible" : "hidden",
                            )}
                        >
                            <span>Copied</span>
                            <Check className="ml-1" />
                        </div>
                    </Button>
                </CopyToClipboard>
            </div>
        </div>
    );
};

export default CopyUserData;
