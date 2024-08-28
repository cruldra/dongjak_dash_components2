import json

import dash
import shortuuid
from dash import _dash_renderer, Output, Input, State
from dash import html, dcc

import dongjak_dash_components2 as ddc
from dongjak_dash_components2.starter import MantineNotificationOperations

notifications_container_id = f"notifications-container-{shortuuid.uuid()}"
notifications_operations = MantineNotificationOperations(notifications_container_id)
keyword_input_id = f"keyword-input-{shortuuid.uuid()}"
duration_seconds_input_id = f"duration-seconds-input-{shortuuid.uuid()}"
size_input_id = f"size-input-{shortuuid.uuid()}"
_dash_renderer._set_react_version("18.2.0")
app = dash.Dash(__name__)
app.layout = ddc.MantineProvider(
    [
        ddc.NotificationProvider(position="top-right"),
        dcc.Location(id='url', refresh=False),
        html.Div(id=notifications_container_id),

        ddc.FunctionCall(
            docs=ddc.Alert(
                "测试",
                title="测试",
            ),
            inputs=[
                ddc.TextInput(id=keyword_input_id, label="关键字", placeholder="输入关键字,比如'留学'", required=True),
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
                ddc.Button("提交", id="submit-button"),
            ]
        )
    ]
)


@app.callback(
    Output(notifications_container_id, "children"),
    Input("submit-button", "n_clicks"),
    State(size_input_id, "value"),
    prevent_initial_call=True
)
def on_submit(n_clicks , size_input_value):
    print(size_input_value)
    return notifications_operations.show_success(json.dumps(size_input_value))


if __name__ == "__main__":
    app.run_server(debug=True)
