import React, {FC} from "react";
import {DashBaseProps} from "props/dash";
import {Group, MantineProvider, Stack} from '@mantine/core';
import {StylesApiProps} from "../props/styles";
import {generateRandomString} from "../utils/random";

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
    style?: React.CSSProperties;
} & DashBaseProps & StylesApiProps;
const FunctionCall: FC<FunctionCallProps> = ({
                                                 inputs,
                                                 outputs,
                                                 docs,
                                                 setProps,
                                                 ...rest
                                             }) => {
    return <Stack
        bg="var(--mantine-color-body)"
        align="stretch"
        justify="flex-start"
        gap="md"
        className={`function-call-${generateRandomString()} p-2 fullwh`}
        {...rest}
    >
        {docs}
        <Group h={500} className={"p-2"} wrap="nowrap" gap={"sm"}>
            <Stack className={`input-parameters-${generateRandomString()}  h-100% w-35% p-2`}>
                {inputs}
            </Stack>
            <Stack className={`output-parameters-${generateRandomString()} h-100% w-65% p-2`}>
                {outputs}
            </Stack>
        </Group>
    </Stack>
};


export default FunctionCall;
