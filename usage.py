from dash import html
from pydantic import BaseModel

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


class Input(BaseModel):
    keyword: str
    """关键字"""
    start_count: int


def test():
    pass


if __name__ == "__main__":
    app.run_server(debug=True)
