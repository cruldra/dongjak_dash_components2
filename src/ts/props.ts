import React from "react";

/**
 * Every Dash components are given these props.
 * Use with your own props:
 * ```
 * type Props = {
 *     my_prop: string;
 * } & DashComponentProps;
 * ```
 * Recommended to use `type` instead of `interface` so you can define the
 * order of props with types concatenation.
 */
export type DashComponentProps = {
    /**
     * Unique ID to identify this component in Dash callbacks.
     */
    id?: string;
    /**
     * Update props to trigger callbacks.
     */
    setProps: (props: Record<string, any>) => void;
}


export  type FunctionCallProps = {
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
} & DashComponentProps;