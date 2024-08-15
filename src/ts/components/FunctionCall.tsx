import React, {FC} from "react";
import {DashBaseProps} from "props/dash";
import {Group, MantineProvider, Stack} from '@mantine/core';

type FunctionCallProps = {
    /**
     * 函数的文档,在顶部显示
     */
    docs?: React.ReactNode;
    /**
     * 函数的输入
     */
    inputs?: React.ReactNode;
    /**
     * 函数的输出
     */
    outputs?: React.ReactNode;
} & DashBaseProps;
const FunctionCall: FC<FunctionCallProps> = ({
                                                 inputs,
                                                 outputs,
                                                 docs,
                                                 ...rest
                                             }) => {
    return  <Stack
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
