import json
import os
import random
import threading

import dash
from flask_cors import CORS
import shortuuid
import webview
from dash import _dash_renderer, Output, Input, State
from dash import html, dcc
from flask import Flask, request
import dongjak_dash_components2 as ddc
from dongjak_dash_components2.starter import MantineNotificationOperations

notifications_container_id = f"notifications-container-{shortuuid.uuid()}"
notifications_operations = MantineNotificationOperations(notifications_container_id)
keyword_input_id = f"keyword-input-{shortuuid.uuid()}"
duration_seconds_input_id = f"duration-seconds-input-{shortuuid.uuid()}"
size_input_id = f"size-input-{shortuuid.uuid()}"
_dash_renderer._set_react_version("18.2.0")
flask_server = Flask(__name__, instance_relative_config=False)
flask_server.config["REDIS_URL"] = "redis://localhost"
CORS(flask_server)
# 导入 sse 蓝图
from flask_sse import sse

# 注册 sse 蓝图
flask_server.register_blueprint(sse, url_prefix='/stream')

@flask_server.route("/cmd", methods=["POST"])
def cmd():
    data = request.get_json()
    print(data)
    if data["cmd"] == "openfile":
        os.startfile(data["value"])
    return ""


app = dash.Dash(server=flask_server)
app.layout = ddc.MantineProvider(
    [
        ddc.NotificationProvider(position="top-right"),
        dcc.Location(id="url", refresh=False),
        html.Div(id=notifications_container_id),
        ddc.FunctionCall(
            docs=ddc.Alert(
                "测试",
                title="测试",
            ),
            inputs=[
                ddc.TextInput(
                    id=keyword_input_id,
                    label="关键字",
                    placeholder="输入关键字,比如'留学'",
                    required=True,
                ),
                # ddc.Text(
                #     size="sm",
                #     children="选择时间范围"
                # ),
                # ddc.RangeSlider(
                #     id=duration_seconds_input_id,
                #     value=[30, 1800],
                #     min=30, max=1800, step=10
                # )
                ddc.SizeInput(
                    id=size_input_id,
                ),
                ddc.AdvanceLink(
                    cmd="openfile",
                    value=r"D:\360Downloads",
                    backend="http://localhost:8060/cmd",
                ),
                ddc.MdxEditor(),
                ddc.JsonViewer(
                    # isShowConfig = False,
                    # value = {
                    #     "a": 1,
                    # }
                    # themeSelectWidth= 200
                ),
                ddc.Button("提交", id="submit-button"),
            ],
            outputs=ddc.TaskTree(
                statusIndicator="http://localhost:8060/stream",
                tasks=[
                    {
                        "id": "1",
                        "title": "采集视频",
                        "children": [
                            {
                                "id": "2",
                                "title": "打开浏览器",
                                "children": [
                                    {
                                        "id": "3",
                                        "title": "检测cdp端口",
                                    },
                                    {
                                        "id": "4",
                                        "title": "复制用户数据目录",
                                    },
                                    {
                                        "id": "5",
                                        "title": "打开浏览器",
                                    },
                                ],
                            },
                            {
                                "id": "6",
                                "title": "采集视频",
                            },
                        ],
                    },
                ]
            ),
        ),
    ]
)


@app.callback(
    Output(notifications_container_id, "children"),
    Input("submit-button", "n_clicks"),
    State(size_input_id, "value"),
    prevent_initial_call=True,
)
def on_submit(n_clicks, size_input_value):
    print(size_input_value)
    taskId = random.randint(1, 6)
    status = random.choice(['running', 'completed', 'error'])
    sse.publish({"id": taskId  , "status": status}, type="task_status_update")
    return notifications_operations.show_success(json.dumps(size_input_value))


def start_server():
    flask_server.run(debug=True, port=8060)


if __name__ == "__main__":
    # server_thread = threading.Thread(target=start_server)
    # server_thread.daemon = True
    # server_thread.start()
    # webview.create_window("test", "http://localhost:8060/", maximized=True)
    # webview.start()

    start_server()
