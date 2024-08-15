import dash
from dash import Dash, _dash_renderer, html
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
        ddc.FunctionCall(
            docs=docs, inputs=inputs, outputs=outputs, style={"padding": "50px"}
        )
    )
    return app
