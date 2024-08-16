import FunctionCall from "./components/FunctionCall";
import AdminAppLayout from "./components/AdminAppLayout";
import Checkbox from "./components/Checkbox";
import ColorInput from "./components/ColorInput";
import Alert from "./components/Alert";
import MantineProvider from "./components/MantineProvider";
import CheckboxGroup from "./components/CheckboxGroup";
import Select from "./components/Select";
import TextInput from "./components/TextInput";
import NumberInput from "./components/NumberInput";
import Button from "./components/Button";
import Notification from "./components/Notification";
import NotificationProvider from "./components/NotificationProvider";
import React from "react";
import {Anchor} from '@mantine/core';

export {
    FunctionCall,
    AdminAppLayout,
    Checkbox,
    ColorInput,
    Alert,
    MantineProvider,
    CheckboxGroup,
    Select,
    TextInput,
    NumberInput,
    Button,
    Notification,
    NotificationProvider,
}
//@ts-ignore
var dagcomponentfuncs = (window.dashAgGridComponentFunctions = window.dashAgGridComponentFunctions || {});

dagcomponentfuncs.Link = function (props) {
    //console.log(props);
    const value: {
        href: string,
        label: string
    } = JSON.parse(props.value);
    return value.href ? React.createElement(
        Anchor,
        {
            href: value.href,
            target: "_blank",
            underline: "never"
        },
        value.label
    ) : value.label;
};