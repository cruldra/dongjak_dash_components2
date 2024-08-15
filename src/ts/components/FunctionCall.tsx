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
        className={"dev-border-blue p-2 fullwh"}
    >
        {docs}
        <Group h={500} className={"dev-border-red p-2"} wrap="nowrap" gap={"sm"}>
            <Stack className={"dev-border-yellow  h-100% w-40%  "}>
                {inputs}
            </Stack>
            <Stack className={"dev-border-yellow   h-100% w-60%"}>
                {outputs}
            </Stack>
        </Group>
    </Stack>
};


export default FunctionCall;
