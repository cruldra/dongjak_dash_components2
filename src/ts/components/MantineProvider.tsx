import {
    MantineProvider as MantineMantineProvider,
    MantineProviderProps,
} from "@mantine/core";
import React, {FC} from "react";

import "@mantine/core/styles.css";

type Props = {
    /** Unique ID to identify this component in Dash callbacks. */
    id?: string;
} & MantineProviderProps

/* MantineProvider */
const MantineProvider: FC<Props> = ({
                                        defaultColorScheme = "auto",
                                        children, ...rest
                                    }) => {


    return (
        <MantineMantineProvider defaultColorScheme={defaultColorScheme} {...rest}>{children}</MantineMantineProvider>
    );
};

MantineProvider.defaultProps = {};

export default MantineProvider;
