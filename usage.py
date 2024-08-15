from dash import html
from pydantic import BaseModel, Field

import dongjak_dash_components2 as ddc
import dash
from dash import Dash, _dash_renderer

from dongjak_dash_components2.starter import function_testing_app

_dash_renderer._set_react_version("18.2.0")
app = dash.Dash(__name__)

app.layout = ddc.MantineProvider(
    ddc.AdminAppLayout(
        id="component",
        routes=[
            {
                "label": "Home",
                "path": "/home",
                "element": ddc.FunctionCall(
                    docs=ddc.Alert(
                        "Something happened! You made a mistake and there is no going back, your data was lost forever!",
                        title="Simple Alert!",
                    ),
                    inputs=[
                        ddc.ColorInput(
                            disallowInput=True,
                            label="Your favorite color",
                            value="#e05e5e",
                            w=250,
                        ),
                        ddc.Checkbox(
                            id="checkbox-state",
                            label="I agree to sell my privacy",
                            checked=True,
                            mb=10,
                        ),
                    ],
                    outputs=html.Div("outputs"),
                ),
            },
            {
                "label": "About",
                "path": "/about",
                "element": html.Div("About"),
            },
            {
                "label": "Contact",
                "path": "/contact",
                "element": html.Div("Contact"),
            },
        ],
    )
)

app = function_testing_app(
    inputs=[
        ddc.TextInput(label="关键字:", required=True , placeholder="留学"),
        ddc.Checkbox(
            id="checkbox-state",
            label="I agree to sell my privacy",
            checked=True,
            mb=10,
        ),
    ]
)

## 这里有一个pydantic模型



## 现在需要创建一个名叫 @dash_form 的装饰器包装这个模型
## 这个装饰器会给模型类添加一个 to_dash_form 方法
## 这个方法先把当前pydantic模型转json_schema，再根据json_schema生成dash组件
## 装饰器使用wrapt这个库
## dash组件代码模板如下:
## 文本框: ddc.TextInput(label="关键字:", required=True , placeholder="留学"),
## 数字框: dmc.NumberInput(
#     label="Your weight in kg",
#     description="From 0 to infinity, in steps of 5",
#     value=5,
#     min=0,
#     step=5,
#     w=250,
# )
## 复选框:  dmc.Checkbox(
        #     id="checkbox-state", label="I agree to sell my privacy", checked=True, mb=10
        # ),


if __name__ == "__main__":
    app.run_server(debug=True)
