import {DashBaseProps} from "props/dash";
import React, {FC} from "react";
import {LazyLog, ScrollFollow} from "@melloware/react-logviewer";

interface LogViewerProps extends DashBaseProps {
    url: string;
    style?: React.CSSProperties;
}

/** LogViewer */
const LogViewer: FC<LogViewerProps> = ({
                                           url,
                                           setProps,
                                           style = {
                                               height: "500px"
                                           },
                                           ...rest
                                       }) => {


    return (
        <div className={"w-full"} style={style}  {...rest}>
            <ScrollFollow
                startFollowing={true}
                render={({follow, onScroll}) => (
                    <LazyLog
                        stream
                        follow={follow}
                        onScroll={onScroll}
                        enableSearch
                        url={url}
                        websocket
                        websocketOptions={{
                            formatMessage: e => {
                                console.log(JSON.parse(e).message)
                                return JSON.parse(e).message
                            }
                        }}
                    />
                )}
            />
        </div>
    );
};

export default LogViewer;
