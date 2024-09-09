import React, {FC} from 'react';
import type {DashBaseProps} from "../props/dash";
import {Tree as MantineTree, TreeProps as MantineTreeProps, TreeNodeData, Group} from "@mantine/core";
import {IconChevronDown} from "@tabler/icons-react";

type  Props = {
    data: MantineTreeProps['data']
} & DashBaseProps
const Tree: FC<Props> = ({
                             setProps,
                             data
                         }) => {
    return (
        <MantineTree data={data}
      renderNode={({ node, expanded, hasChildren, elementProps }) => (
        <Group gap={5} {...elementProps}>
          {hasChildren && (
            <IconChevronDown
              size={18}
              style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          )}

          <span>{node.label}</span>
        </Group>
      )}/>
    );
};

export default Tree;