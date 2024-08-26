from typing import Tuple, Any

import dash
import shortuuid
from addict import Dict
from dash import _dash_renderer, html, dcc
from dash_iconify import DashIconify
from pydantic import ValidationError
from pydantic_i18n import PydanticI18n

import dongjak_dash_components2 as ddc


class DashComponentOperations:
    def __init__(self, cmp_id: str):
        self.cmp_id = cmp_id

    def as_callback_input(self, property_name: str = "value"):
        return dash.dependencies.Input(self.cmp_id, property_name)

    def as_callback_state(self, property_name: str = "value"):
        return dash.dependencies.State(self.cmp_id, property_name)

    def as_callback_output(self, property_name: str = "children", allow_duplicate: bool = True):
        return dash.dependencies.Output(self.cmp_id, property_name, allow_duplicate)


class MantineButtonOperations(DashComponentOperations):
    def __init__(self, cmp_id: str):
        super().__init__(cmp_id)

    def n_clicks_as_input(self):
        return self.as_callback_input("n_clicks")


class MantineNotificationOperations(DashComponentOperations):
    def __init__(self, cmp_id: str):
        super().__init__(cmp_id)

    def show_success(self, message: str):
        return ddc.Notification(
            title="成功",
            id=f"notification-{shortuuid.uuid()}",  # 生成一个随机id
            action="show",
            message=message,
            icon=DashIconify(icon="ic:round-celebration"),
        )

    def show_error(self, message: str):
        return ddc.Notification(
            title="错误",
            id=f"notification-{shortuuid.uuid()}",  # 生成一个随机id
            action="show",
            message=message,
            icon=DashIconify(icon="ant-design:exclamation-outlined"),
        )


# region 创建函数测试界面
def function_testing_app(docs=None, inputs=None, outputs=None, notifications_container_id="notifications-container"):
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

    comps, ids, operations = convert_pydantic_model_to_dash_form(Input)

    app = function_testing_app(
        inputs=comps,
        notifications_container_id=ids.notification
    )

    ```

    最后处理回调:


    ```python

    @app.callback(
        operations.notification.as_callback_output(),
        operations.submit_button.n_clicks_as_input(),
        operations.keyword.as_callback_state(),
        prevent_initial_call=True,
    )
    def callback(n_clicks, keyword):
        validate_res = is_valid(Input, 1,{"keyword": keyword})
        if validate_res is not True:
            return validate_res
        return operations.notification.show_success("验证成功")

    ```

    :param docs: 文档字符串
    :param inputs: 输入参数
    :param outputs: 输出参数
    :param notifications_container_id: 通知容器id
    """
    _dash_renderer._set_react_version("18.2.0")
    app = dash.Dash(__name__)
    app.layout = ddc.MantineProvider(
        [
            ddc.NotificationProvider(position="top-right"),
            dcc.Location(id='url', refresh=False),
            html.Div(id=notifications_container_id),
            ddc.FunctionCall(
                docs=docs, inputs=inputs, outputs=outputs, style={"padding": "50px"}
            ),
        ]
    )
    return app
# endregion


# region pydantic模型转换为dash表单
def convert_pydantic_model_to_dash_form(
        model: type,
        others: list[Tuple[int, Any]] = None,
        submit_button: bool = True,
        submit_button_label: str = "提交",
) -> Tuple[list, Dict[str, str], Dict[str, DashComponentOperations]]:
    """
    将Pydantic模型转换为Dash表单

    :param model: Pydantic模型
    :param others: 其他组件,格式为[(index,component)],index为插入位置,component为组件
    :param submit_button: 是否显示提交按钮
    :param submit_button_label: 提交按钮标签
    """
    dict = Dict(model.model_json_schema())
    # print(dict)
    dash_components = []
    ids = Dict()
    operations = Dict()
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
            operations[key] = DashComponentOperations(com_id)
        elif value.type == "integer" or value.type == "number":
            com_id = f"number-input-{shortuuid.uuid()}"
            dash_components.append(
                ddc.NumberInput(
                    id=com_id,
                    label=value.title,
                    placeholder=value.description if value.description else None,
                    value=value.default if value.default is not None else None,
                    required=key in required,
                )
            )
            ids[key] = com_id
            operations[key] = DashComponentOperations(com_id)
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
            com_logviewer_id = f"logviewer-{shortuuid.uuid()}"
            com_xgplayer_id = f"xgplayer-{shortuuid.uuid()}"
            if value.comps_name == "LogViewer":
                dash_components.append(
                    ddc.LogViewer(
                        id=com_logviewer_id,
                        # url = 'ws://localhost:8765',
                        url = 'wss://echo.websocket.org',
                        #websocket= True,
                        #isShowTestButton=True,
                        # websocketOptions={
                        #     # 'onOpen': lambda e, sock: sock.send(json.dumps({"message": "Socket has been opened!"})),
                        #     # 'formatMessage': lambda e: json.loads(e).get('message', ''),
                        #     # 自动重新连接设置
                        #     'reconnect': True,
                        #     'reconnectWait': 1  # 默认时间间隔为1秒
                        # }
                    ),
                ),
                ids[key] = com_logviewer_id
            elif value.comps_name == "XGPlayer":  
                dash_components.append(
                    ddc.XGPlayer(
                        id=com_xgplayer_id,
                        # width= 150,
                        fluid=True,
                        url = 'http://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
                    ),
                ),
                ids[key] = com_xgplayer_id
            else:
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
                ),
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
        operations["submit_button"] = MantineButtonOperations(submit_button_id)
    ids["notification"] = f"notifications-container-{shortuuid.uuid()}"
    operations["notification"] = MantineNotificationOperations(ids["notification"])
    return dash_components, ids, operations
# endregion

# 定义翻译
translations = {
    'en_US': {
        'field required': 'This field is required.',
        'value_error.number.not_ge': 'Value must be greater than or equal to {limit_value}.',
    },
    'zh_CN': {
        'Input should be a valid string': '字段是必填项。',
        "Input should be a valid integer": "字段必须是整数"
    }
}
i18n = PydanticI18n(translations)


# 使用中文错误消息
def is_valid(model_type: type, return_args_count: int, kwargs: dict):
    try:
        model = model_type(**kwargs)
    except ValidationError as e:
        ne = i18n.translate(e.errors(), "zh_CN")
        return ddc.Notification(
            title="错误",
            id="error-notification",
            action="show",
            message=f"验证失败,{ne[0]['loc'][0]}{ne[0]['msg']}",
            icon=DashIconify(icon="ant-design:exclamation-outlined"),
        ), *([None] * (return_args_count - 1))
    return True