from typing import Tuple, Any

import dash
import shortuuid
from addict import Dict
from dash import _dash_renderer, html
from dash_iconify import DashIconify
from pydantic import BaseModel, Field

import dongjak_dash_components2 as ddc


def function_testing_app(docs=None, inputs=None, outputs=None):
    """
    快速创建一个用于函数测试的Dash应用

    :param docs: 文档字符串
    :param inputs: 输入参数
    :param outputs: 输出参数
    """
    _dash_renderer._set_react_version("18.2.0")
    app = dash.Dash(__name__)
    app.layout = ddc.MantineProvider(
        [
            ddc.NotificationProvider(position="top-right"),
            html.Div(id="notifications-container"),
            ddc.FunctionCall(
                docs=docs, inputs=inputs, outputs=outputs, style={"padding": "50px"}
            )
        ]
    )
    return app


def convert_pydantic_model_to_dash_form(
        model: type, others: list[Tuple[int, Any]] = None,
        submit_button: bool = True,
        submit_button_label: str = "提交",
) -> (list, Dict):
    """
    将Pydantic模型转换为Dash表单

    :param model: Pydantic模型
    :param others: 其他组件,格式为[(index,component)],index为插入位置,component为组件
    :param submit_button: 是否显示提交按钮
    :param submit_button_label: 提交按钮标签
    """
    dict = Dict(model.model_json_schema())
    print(dict)
    dash_components = []
    ids = Dict()
    required = dict.required
    # 遍历 properties
    for key, value in dict.properties.items():
        if value.type == "string":
            com_id = f"text-input-{shortuuid.uuid()}"
            dash_components.append(
                ddc.TextInput(
                    id=com_id,
                    label=value.title,
                    placeholder=value.description if value.description else None,
                    value=value.default if value.default else None,
                    required=key in required,
                )
            )
            ids[key] = com_id
        elif value.type == "integer" or value.type == "number":
            com_id = f"number-input-{shortuuid.uuid()}"
            dash_components.append(
                ddc.NumberInput(
                    id=com_id,
                    label=value.title,
                    placeholder=value.description if value.description else None,
                    value=value.default if value.default else None,
                    required=key in required,
                )
            )
            ids[key] = com_id
        elif value.type == "boolean":
            raise NotImplementedError
        elif value.type == "array":
            raise NotImplementedError
        elif value.type == "object":
            raise NotImplementedError
        elif value.type == "null":
            raise NotImplementedError
        else:
            raise NotImplementedError
    if others:
        for others_item in others:
            dash_components.insert(others_item[0], others_item[1])

    if submit_button:
        submit_button_id = f"submit-button-{shortuuid.uuid()}"
        dash_components.append(
            ddc.Button(
                submit_button_label,
                id=submit_button_id
            )
        )
        ids["submit_button"] = submit_button_id
    ids["notification"] = "notifications-container"
    return dash_components, ids


class Input(BaseModel):
    keyword: str = Field(title="关键字", description="搜索关键字,比如: 留学")
    fetch_count: int = Field(title="抓取数量", default=10, ge=1, le=200)
    star_count: int = Field(
        title="点赞数量", description="仅抓取点赞数量大于该值的视频", default=None
    )


comps, ids = convert_pydantic_model_to_dash_form(Input)
app = function_testing_app(
    inputs=comps,
)


@app.callback(
    dash.dependencies.Output(ids.notification, "children", allow_duplicate=True),
    dash.dependencies.Input(ids.submit_button, "n_clicks"),
    prevent_initial_call=True,
)
def callback(n_clicks):
    return ddc.Notification(
        title="Hey there!",
        id="simple-notify",
        action="show",
        message="Notifications in Dash, Awesome!",
        icon=DashIconify(icon="ic:round-celebration"),
    )


if __name__ == "__main__":
    # print(convert_pydantic_model_to_dash_form(Input))
    app.run_server(debug=True)
