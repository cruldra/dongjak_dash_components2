from dash import html

import dongjak_dash_components2 as ddc
import dash
import dash_mantine_components as dmc
from dash import Dash, _dash_renderer

_dash_renderer._set_react_version("18.2.0")
app = dash.Dash(__name__)

app.layout = ddc.AdminAppLayout(
    id="component",
    routes=[
        {
            "label": "Home",
            "path": "/home",
            "element": html.Div("Home"),
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

if __name__ == "__main__":
    app.run_server(debug=True)
