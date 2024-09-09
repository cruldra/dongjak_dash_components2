import React, { CSSProperties, FC, useEffect, useState } from 'react';
import type { DashBaseProps } from "../props/dash";
import { Group, Tree as MantineTree, TreeNodeData, useTree } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { ClipLoader } from 'react-spinners';
import { json } from 'react-router-dom';

type TaskNodeData = {
    /** 任务ID */
    id: string,

    /** 任务标题 */
    title: React.ReactNode,

    /** 子任务 */
    children?: TaskNodeData[]
}

type Props = {
    /** 任务节点数据 */
    tasks: TaskNodeData[]

    /** 任务状态指示器,一个sse端点 */
    statusIndicator?: string

    /** 任务节点样式 */
    style?:CSSProperties
} & DashBaseProps

const mapTaskToTreeNodeData = (task: TaskNodeData): TreeNodeData => {
    return {
        ...task,
        label: task.title,
        value: task.id,
        children: task.children?.map(mapTaskToTreeNodeData),
    };
};

/**
 * 将任务树展平为一维数组。
 * 
 * 该函数接受一个 `TaskNodeData` 类型的任务节点对象,并返回一个包含该节点及其所有子节点的一维数组。
 * 
 * @param task 要展平的任务节点对象
 * @returns 包含该任务节点及其所有子节点的一维数组
 */
const flattenTaskTree = (task: TaskNodeData): TaskNodeData[] => {
    return [task, ...task.children?.flatMap(flattenTaskTree) || []];
};

const findTreeNodeData = (treeData: TreeNodeData[], id: string): TreeNodeData | undefined => {
    for (const node of treeData) {
        if (node.value == id) {
            return node;
        }
        if (node.children) {
            const result = findTreeNodeData(node.children, id);
            if (result) {
                return result;
            }
        }
    }
    return undefined;
};

const setTreeNodeDataProp = (treeData: TreeNodeData[], id: string, propName: string, value: any) => {
    const node = findTreeNodeData(treeData, id);
    console.log(`找到id为${id}的节点为${JSON.stringify(node)}`);
    if (node) {
        node[propName] = value;
    }
};

/**
 * 任务树组件
 * 
 * 该组件用于渲染一个任务树结构,支持展开/折叠子任务。
 * 
 * @param setProps - 用于设置组件属性的回调函数
 * @param tasks - 任务节点数据,包含任务ID、标题和子任务
 * @returns 渲染好的任务树组件
 */
const TaskTree: FC<Props> = ({
    setProps,
    tasks,
    statusIndicator,
    style
}) => {

    const allTasks = tasks.flatMap(flattenTaskTree);
    const tree = useTree({
        initialExpandedState: allTasks.reduce((acc, task) => {
            acc[task.id] = true;
            return acc;
        }, {}),
    });

    const [treeData, setTreeData] = useState<TreeNodeData[]>(tasks.map(mapTaskToTreeNodeData));

    //region 渲染任务节点

    const getIndicatorByStatus = (status:string)=>{
        switch (status) {
            case "running":
                return <ClipLoader
                    color="green"
                    loading={true}
                    size={15}
                />
            case "success":
                return <span style={{ fontSize: 15 }}>✅</span>
            case "failed":
                return <span style={{ fontSize: 15 }}>❌</span>
            default:
                return <span style={{ fontSize: 15 }}>⚪</span>
        }
    }

    const renderNode = ({ node, expanded, hasChildren, elementProps }) => (
        <Group gap={5} {...elementProps}> 
            {
                getIndicatorByStatus(node.status)
            }
            <span>{node.label}</span>
        </Group>
    )
    //endregion

    //region 更新任务状态
    useEffect(() => {
        if (!statusIndicator) {
            return;
        }
        const eventSource = new EventSource(statusIndicator);
        eventSource.addEventListener('task_status_update', (event) => {
            var task=JSON.parse(event.data);
            console.log(`将任务${task.id}状态设置为${task.status}`);
            setTreeNodeDataProp(treeData, task.id, 'status', task.status);
            console.log(treeData)
            setTreeData([...treeData]);
        }, false);
        return () => {
            eventSource.close();
        };
    }, [statusIndicator]);
    //endregion

    return <MantineTree style={style} tree={tree} data={treeData} renderNode={renderNode} />
};

export default TaskTree;