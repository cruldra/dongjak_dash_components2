import shortuuid
from dash import html, dcc
from pydantic import BaseModel, Field

import dongjak_dash_components2 as ddc
import dash
from dash import Dash, _dash_renderer

from dongjak_dash_components2.starter import function_testing_app

notifications_container_id = f"notifications-container-{shortuuid.uuid()}"
keyword_input_id = f"keyword-input-{shortuuid.uuid()}"
duration_seconds_input_id = f"duration-seconds-input-{shortuuid.uuid()}"
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
                ddc.Text(
                    size="sm",
                    children="选择时间范围"
                ),
                ddc.RangeSlider(
                    id=duration_seconds_input_id,
                    value=[30, 1800],
                    min=30, max=1800, step=10
                )
            ]
        )
    ]
)

if __name__ == "__main__":
    app.run_server(debug=True)
