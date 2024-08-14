.$PROFILE
Set-ConsoleTitle -Title "发布"

& "D:\Workspace\dongjak\dongjak_dash_components2/.venv/Scripts/activate.ps1"

npm run build

python setup.py sdist

twine upload -u cruldra -p pypi-AgEIcHlwaS5vcmcCJDFkNDIyZDhhLTc1OGMtNGQyOC1iYTYyLTQ5Y2JmMWQ4OGIwZQACKlszLCJlNjQ4YTUxZS1jZjEzLTRhNWUtOGJlNS03Mzk3YzVhMDIwMDAiXQAABiARSErO2vssdFM242WB_LKXjHZHkbsthj3oUsOU0-5oEw dist/*
