import dongjak_dash_components2
from dash import Dash, callback, html, Input, Output

app = Dash(__name__)

app.layout = html.Div([
    dongjak_dash_components2.DongjakDashComponents2(
        id='input',
        value='my-value',
        test= html.Div(1),
        label='my-label'
    ),
    html.Div(id='output')
])


@callback(Output('output', 'children'), Input('input', 'value'))
def display_output(value):
    return 'You have entered {}'.format(value)


if __name__ == '__main__':
    app.run_server(debug=True)
