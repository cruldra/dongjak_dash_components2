from typing import Tuple, Any
import dash
import shortuuid
import wrapt
from addict import Dict
from dash import _dash_renderer, html
from dash.exceptions import PreventUpdate
from dash_iconify import DashIconify
from pydantic import BaseModel, Field, ValidationError
from pydantic_i18n import PydanticI18n

import dongjak_dash_components2 as ddc


def function_testing_app(docs=None, inputs=None, outputs=None):
    """
    快速创建一个用于函数测试的Dash应用


    首先定义模型:

    ```python

    class Input(BaseModel):
        keyword: str = Field(title="关键字", description="搜索关键字,比如: 留学")
        fetch_count: int = Field(title="抓取数量", default=10, ge=1, le=200)
        star_count: int = Field(
            title="点赞数量", description="仅抓取点赞数量大于该值的视频", default=None
        )

    ```

    然后基于这个模型生成dash应用:

    ```python

    comps, ids = convert_pydantic_model_to_dash_form(Input)

    app = function_testing_app(
        inputs=comps,
    )

    ```

    最后处理回调:


    ```python

    @app.callback(
        dash.dependencies.Output(ids.notification, "children", allow_duplicate=True),
        dash.dependencies.Input(ids.submit_button, "n_clicks"),
        dash.dependencies.State(ids.keyword, "value"),
        prevent_initial_call=True,
    )
    def callback(n_clicks, keyword):
        validate_res = is_valid(Input, 1,{"keyword": keyword})
        if validate_res is not True:
            return validate_res
        return ddc.Notification(
            title="Hey there!",
            id="simple-notify",
            action="show",
            message="Notifications in Dash, Awesome!",
            icon=DashIconify(icon="ic:round-celebration"),
        )

    ```

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
            ),
        ]
    )
    return app


def convert_pydantic_model_to_dash_form(
        model: type,
        others: list[Tuple[int, Any]] = None,
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
            com_id = f"checkbox-{shortuuid.uuid()}"
            dash_components.append(
                ddc.Checkbox(
                    id=com_id,
                    label=value.title,
                    description=value.description if value.description else None,
                    checked=value.default if value.default else False,
                    # required=key in required,
                )
            )
            ids[key] = com_id
            # raise NotImplementedError
        elif value.type == "array":
            com_id = f"select-{shortuuid.uuid()}"
            dash_components.append(
                ddc.Select(
                    id=com_id,
                    label=value.title,
                    description=value.description if value.description else None,
                    placeholder=value.placeholder,
                    value=value.default,
                    data=value.data,
                    required=key in required,
                ),
            )
            ids[key] = com_id
            # raise NotImplementedError
        elif value.type == "object":
            raise NotImplementedError
        elif value.type == "null":
            com_id = f"alert-{shortuuid.uuid()}"
            dash_components.append(
                ddc.Alert(
                    value.content,
                    id=com_id,
                    title=value.title,
                    color=value.color,
                    # duration=value.duration,
                    # required=key in required,
                ),
            )
            ids[key] = com_id
            # raise NotImplementedError
        else:
            raise NotImplementedError
    if others:
        for others_item in others:
            dash_components.insert(others_item[0], others_item[1])

    if submit_button:
        submit_button_id = f"submit-button-{shortuuid.uuid()}"
        dash_components.append(ddc.Button(submit_button_label, id=submit_button_id))
        ids["submit_button"] = submit_button_id
    ids["notification"] = "notifications-container"
    return dash_components, ids


class Input(BaseModel):
    keyword: str = Field(title="关键字", description="搜索关键字,比如: 留学")
    fetch_count: int = Field(title="抓取数量", default=10, ge=1, le=200)
    star_count: int = Field(
        title="点赞数量", description="仅抓取点赞数量大于该值的视频", default=None
    )
    alert: None = Field(
        title="我是提示", content="您的余额不足，请充值", color="blue"
    )
    author: bool = Field(
        title="作者", description="作者选择", default=True
    )
    duration: list = Field(
        title="时长", description="视频时长", placeholder="请选择视频时长", 
        default="5",
        data=[
            {"value": "1", "label": "1分钟"},
            {"value": "3", "label": "3分钟"},
            {"value": "5", "label": "5分钟"},
        ]
    )


comps, ids = convert_pydantic_model_to_dash_form(Input)
app = function_testing_app(
    inputs=comps,
)


# def validate(model_type: type, return_args_count: int):
#     @wrapt.decorator
#     def wrapper(wrapped, instance, args, kwargs):
#         if args[0] is None:
#             raise PreventUpdate
#         try:
#             model = model_type(*args[1:])
#         except ValidationError as e:
#             return (
#                 ddc.Notification(
#                     title="错误",
#                     id="error-notification",
#                     action="show",
#                     message=f"次数已用完,请充值",
#                     icon=DashIconify(icon="ant-design:exclamation-outlined"),
#                 ),
#                 *([None] * (return_args_count - 1)),
#             )
#         return wrapped(*args, **kwargs)
#
#     return wrapper
# 定义翻译
translations = {
    'en_US': {
        'field required': 'This field is required.',
        'value_error.number.not_ge': 'Value must be greater than or equal to {limit_value}.',
    },
    'zh_CN': {
        'Input should be a valid string': '字段是必填项。',
        'value_error.number.not_ge': '数值必须大于或等于 {limit_value}。',
    }
}
i18n = PydanticI18n(translations)
# 使用中文错误消息
def is_valid(model_type: type,return_args_count: int, kwargs: dict):
    try:
        model = model_type(**kwargs)
    except ValidationError as e:
        ne=i18n.translate(e.errors(),"zh_CN")
        return ddc.Notification(
            title="错误",
            id="error-notification",
            action="show",
            message=f"验证失败,{ne[0]['loc'][0]}{ne[0]['msg']}",
            icon=DashIconify(icon="ant-design:exclamation-outlined"),
        ),*([None] * (return_args_count - 1))
    return True


@app.callback(
    dash.dependencies.Output(ids.notification, "children", allow_duplicate=True),
    dash.dependencies.Input(ids.submit_button, "n_clicks"),
    dash.dependencies.State(ids.keyword, "value"),
    prevent_initial_call=True,
)
# @validate(Input, 1)
def callback(n_clicks, keyword):
    validate_res = is_valid(Input, 1,{"keyword": keyword})
    if validate_res is not True:
        return validate_res
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
