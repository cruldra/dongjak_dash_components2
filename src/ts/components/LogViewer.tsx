
import {
    Button as MantineButton
} from "@mantine/core";
import { DashBaseProps } from "props/dash";
import { StylesApiProps } from "props/styles";
import React from "react";
import { LazyLog, ScrollFollow } from "@melloware/react-logviewer";
import { LazyLogProps } from "@melloware/react-logviewer/dist/cjs/types/components/LazyLog";

interface Props extends DashBaseProps, StylesApiProps, LazyLogProps {
    /** 测试ping按钮 */
    isShowTestButton?: boolean;
}

/** LogViewer */
const LogViewer = (props: Props) => {
    const {url, isShowTestButton=false, ...others } = props;
    let socket;

    const onStart = () => {
        socket = new WebSocket("ws://localhost:8765");

        socket.onopen = function() {
            socket.send(JSON.stringify({ action: "start" }));
        };

        socket.onmessage = function(event) {
            console.log(event.data,event);
            const messagesDiv = document.getElementById("messages");
            const message = document.createElement("div");
            message.textContent = event.data;
            messagesDiv.appendChild(message);
        }
    }
   

    const onStop = () => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({ action: "stop" }));
            socket.close();
        }
    }


    // const url = 'ws://localhost:8765';
    // const url = 'https://gist.githubusercontent.com/helfi92/96d4444aa0ed46c5f9060a789d316100/raw/ba0d30a9877ea5cc23c7afcd44505dbc2bab1538/typical-live_backing.log';
    // const url = 'wss://echo.websocket.org';
    let socket2 = null;


    return (
        <div style={{ height: 500, width: 902 }}>
            {/* <button id="startButton" onClick={onStart}>Start</button>
            <button id="stopButton" onClick={onStop}>Stop</button>
            <div id="messages"></div> */}
            <div style={{display: isShowTestButton ? 'block' : 'none'}}>
                <MantineButton
                    style={{ marginBottom: 8}}
                    onClick={() => socket && socket.send(JSON.stringify({ message: '[taskcluster 2018-11-14 21:08:32.452Z] Worker Group: us-east-1' }))}>
                    ping
                </MantineButton>
            </div>
            <ScrollFollow
                startFollowing={true}
                render={({ follow, onScroll }) => (
                    <LazyLog
                    stream 
                    follow={follow} 
                    onScroll={onScroll} 
                    enableSearch
                    url={url}
                    websocket
                    websocketOptions={{
                        onOpen: (e, sock) => {
                            socket = sock; sock.send(JSON.stringify({message: "Socket has been opened!"}))
                            },
                        formatMessage: e => JSON.parse(e).message,
                    }}
                    {...others}
                    />
                )}
            />
        </div>
    );
};

export default LogViewer;
