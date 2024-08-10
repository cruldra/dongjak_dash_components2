import React, {FC} from 'react';
import {DashComponentProps} from "../props";
import {Route as ReactRoute, RouteProps} from "react-router-dom";

//region 参数定义
type ReactRouteProps = {
    label: string;
    icon?: React.ReactNode | string;
} & RouteProps & DashComponentProps
//endregion

const Route: FC<ReactRouteProps> = ({setProps, icon, ...rest}) => {
    return (
        <ReactRoute {...rest}/>
    );
};

export default Route;