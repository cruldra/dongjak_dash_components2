from dash import html

import dongjak_dash_components2
import dash

app = dash.Dash(__name__)

app.layout = dongjak_dash_components2.DongjakDashComponents2(id='component', test=html.Div('Hello World'))

if __name__ == '__main__':
    app.run_server(debug=True)
