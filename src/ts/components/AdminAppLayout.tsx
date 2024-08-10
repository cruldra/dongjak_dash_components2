//region 导入
import React, {FC, ReactElement, ReactNode} from 'react';
import {AppShell, Burger, Group, MantineProvider, NavLink} from '@mantine/core';
import {MantineLogo} from '@mantinex/mantine-logo';
import {useDisclosure} from '@mantine/hooks';
import {
    createBrowserRouter,
    Link,
    NonIndexRouteObject,
    Outlet,
    RouteObject,
    RouterProvider,
    useNavigate
} from 'react-router-dom';
import {DashComponentProps} from "../props";

//endregion

//region 参数定义
type AdminAppLayoutProps = {
    routes?: RouteObjectProps[];
} & DashComponentProps


type RouteObjectProps = {
    label: string;
    icon?: React.ReactNode | string;
    children?: RouteObjectProps[];
} & Pick<RouteObject, 'path' | 'element'>;


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
 * @returns [路由对象, 导航链接]
 */
const parseRouteDef = (route: RouteObjectProps) => {
    const {element, label, icon, path} = route;
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

    if (route.children) {
        const childRoutes: RouteObject[] = [];
        const childNavLinks: ReactNode[] = [];

        route.children.forEach((childRoute) => {
            const [childRouteObject, childNavLink] = parseRouteDef(childRoute);
            childRoutes.push(childRouteObject as NonIndexRouteObject);
            childNavLinks.push(childNavLink as ReactNode);
        });

        routeObject.children = childRoutes;
        navLink.props.children = childNavLinks;
    }

    return [routeObject, navLink];
}


/**
 * 管理后台类应用通用布局
 */
const AdminAppLayout: FC<AdminAppLayoutProps> = ({routes}) => {
    console.log(routes)
    const routeWithLinks = routes.map(parseRouteDef)
    const router = createBrowserRouter([
        {
            path: "/",
            element: <RootLayout links={routeWithLinks.map(([route, navLink]) => navLink as ReactElement)}/>,
            children: routeWithLinks.map(([route, navLink]) => route as RouteObject),
        },

    ]);


    return <>
        <MantineProvider defaultColorScheme="auto">
            <RouterProvider router={router}/>
        </MantineProvider>
    </>
};
//endregion

export default AdminAppLayout;