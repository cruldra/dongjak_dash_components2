from dash import html

import dongjak_dash_components2 as ddc
import dash
import dash_mantine_components as dmc
from dash import Dash, _dash_renderer

_dash_renderer._set_react_version("18.2.0")
app = dash.Dash(__name__)

app.layout = ddc.AdminAppLayout(
    id="component",
    # routes=[
    #     {
    #         "label": "Home",
    #         "path": "/home",
    #         "title": "Home",
    #         "element": html.Div("Home"),
    #     }
    # ],
    routes= ddc.Route(
        label="Home",
        path="/home",
        element=html.Div("Home"),
    )
)

if __name__ == "__main__":
    app.run_server(debug=True)
