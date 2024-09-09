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
import Accordion from "./components/Accordion";
import AccordionControl from "./components/AccordionControl";
import AccordionItem from "./components/AccordionItem";
import AccordionPanel from "./components/AccordionPanel";
import Textarea from "./components/Textarea";
import LogViewer from "./components/Logviewer";
import Tabs from "./components/Tabs";
import TabsList from "./components/TabsList";
import TabsPanel from "./components/TabsPanel";
import TabsTab from "./components/TabsTab";
import UnstyledButton from "./components/UnstyledButton";
import Group from "./components/Group";
import XGPlayer from "./components/XGPlayer";
import RangeSlider from "./components/RangeSlider";
import Text from "./components/Text";
import SizeInput from "./components/SizeInput";
import Slider from "./components/Slider";
import AdvanceLink from "./components/AdvanceLink";
import Tree from "./components/Tree";
import TaskTree from "./components/TaskTree";


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
    Accordion,
    AccordionControl,
    AccordionItem,
    AccordionPanel,
    Textarea,
    LogViewer,
    Tabs,
    TabsList,
    TabsPanel,
    TabsTab,
    UnstyledButton,
    Group,
    XGPlayer,
    RangeSlider,
    Text,
    SizeInput,
    Slider,
    AdvanceLink,
    Tree,
    TaskTree
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