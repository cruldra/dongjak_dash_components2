//region 导入
import React, {FC, ReactElement, ReactNode} from 'react';
import {AppShell, Burger, Group, MantineProvider, NavLink} from '@mantine/core';
import {MantineLogo} from '@mantinex/mantine-logo';
import {useDisclosure} from '@mantine/hooks';
import {Link, Outlet, RouteObject, useNavigate} from 'react-router-dom';
import {DashComponentProps} from "../props";

//endregion

//region 参数定义
type AdminAppLayoutProps = {
    nodes?: ReactNode;
    routes?: RouteObjectProps[];
} & DashComponentProps


type RouteObjectProps = {
    id: string;
    label: string;
    icon?: React.ReactNode | string;
    //children?: string[];
} & Pick<RouteObject, 'path'>;


type RootLayoutProps = {
    links: ReactNode[];
}
//endregion


//region 组件定义


//region 根布局
const RootLayout: FC<RootLayoutProps> = ({
                                             links
                                         }) => {
    const [opened, {toggle}] = useDisclosure();
    const navgation = useNavigate();

    return <AppShell
        header={{height: 60}}
        navbar={{width: 300, breakpoint: 'sm', collapsed: {mobile: !opened}}}
        padding="md"
    >
        <AppShell.Header>
            <Group h="100%" px="md">
                <Burger id='sssssss' opened={opened} onClick={toggle} hiddenFrom="sm" size="sm"/>
                <MantineLogo size={30}/>
            </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
            {links}
        </AppShell.Navbar>
        <AppShell.Main>
            <Outlet/>
        </AppShell.Main>
    </AppShell>
}
//endregion

/**
 * 解析路由定义
 *
 * @param route 路由定义列表
 * @param nodes 节点列表
 * @returns [路由对象, 导航链接]
 */
const parseRouteDef = (route: RouteObjectProps, nodes: ReactElement[]) => {
    const {id, label, icon, path} = route;
    const element = nodes.find((node) => node.props.id === id);
    const routeObject: RouteObject = {
        path,
        element,
    };

    const navLink = (
        <NavLink
            label={label}
            leftSection={icon}
            childrenOffset={28}
            component={Link}
            to={path}
        />
    );

    // if (route.children) {
    //     const childRoutes: RouteObject[] = [];
    //     const childNavLinks: ReactNode[] = [];

    //     route.children.forEach((childRoute) => {
    //         const [childRouteObject, childNavLink] = parseRouteDef(childRoute,nodes);
    //         childRoutes.push(childRouteObject as NonIndexRouteObject);
    //         childNavLinks.push(childNavLink as ReactNode);
    //     });

    //     routeObject.children = childRoutes;
    //     navLink.props.children = childNavLinks;
    // }

    return [routeObject, navLink];
}


/**
 * 管理后台类应用通用布局
 */
const AdminAppLayout: FC<AdminAppLayoutProps> = ({nodes, setProps}) => {
    // console.log(nodes)
    // const routeWithLinks = routes.map(it => parseRouteDef(it, nodes))
    // const router = createBrowserRouter([
    //     {
    //         path: "/",
    //         element: <RootLayout links={routeWithLinks.map(([route, navLink]) => navLink as ReactElement)} />,
    //         children: routeWithLinks.map(([route, navLink]) => route as RouteObject),
    //     },

    // ]);


    return <>
        <MantineProvider defaultColorScheme="auto">
            {/* <RouterProvider router={router} /> */}
            <div>
                {nodes}
            </div>
        </MantineProvider>
    </>
};
//endregion

export default AdminAppLayout;