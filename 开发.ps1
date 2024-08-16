.$PROFILE
Set-ConsoleTitle -Title "非调试模式运行"

& "D:/Workspace/dongjak/dongjak-dash-components/.venv/Scripts/activate.ps1"

$env:PYTHONPATH = "D:\Workspace\dongjak\dongjak_dash_components2"


# 实时编译前端代码
Start-Job -ScriptBlock { npm run watch }

# 实时编译样式
Start-Job -ScriptBlock { unocss --watch }


python .\demos\admin_app_layout.py
# python .\demos\base.py