import React, {FC} from "react";
import {DashComponentProps} from "../props";

interface Props extends DashComponentProps {
    inputs?: React.ReactNode;
    outputs?: React.ReactNode;
    docs?: React.ReactNode;
}

const FunctionCall: FC<Props> = ({
                                     inputs,
                                     outputs,
                                     docs,
                                     ...rest
                                 }) => {
    return <div style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: "1rem",
    }} {...rest}>

        <div style={{
            width: "100%",
            margin: "10px",
        }}>
            {docs}
        </div>

        <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "row",
            gap: "1rem",
        }}>

            <div style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "1rem",
            }}>
                {inputs}
            </div>

            <div style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "1rem",
                flex: 1,
                justifyContent: "flex-start",
                alignItems: "center",
                margin: "10px",
            }}>
                {outputs}
            </div>
        </div>
    </div>
};


export default FunctionCall;
