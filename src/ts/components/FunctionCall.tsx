import React, {FC} from "react";
import {FunctionCallProps} from "../props";
import {Group, Stack} from '@mantine/core';

const FunctionCall: FC<FunctionCallProps> = ({
                                                 inputs,
                                                 outputs,
                                                 docs,
                                                 ...rest
                                             }) => {
    return <Stack
        bg="var(--mantine-color-body)"
        align="stretch"
        justify="flex-start"
        gap="md"
        className={"p-2 fullwh"}
    >
        {docs}
        <Group h={500} className={"p-2"} wrap="nowrap" gap={"sm"}>
            <Stack className={"h-100% w-40%  "}>
                {inputs}
            </Stack>
            <Stack className={"h-100% w-60%"}>
                {outputs}
            </Stack>
        </Group>
    </Stack>
};


export default FunctionCall;
