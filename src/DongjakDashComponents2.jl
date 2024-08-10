
module DongjakDashComponents2
using Dash

const resources_path = realpath(joinpath( @__DIR__, "..", "deps"))
const version = "1.0.0"

include("jl/''_adminapplayout.jl")
include("jl/''_dongjakdashcomponents2.jl")
include("jl/''_functioncall.jl")

function __init__()
    DashBase.register_package(
        DashBase.ResourcePkg(
            "dongjak_dash_components2",
            resources_path,
            version = version,
            [
                DashBase.Resource(
    relative_package_path = "dongjak_dash_components2.js",
    external_url = nothing,
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "dongjak_dash_components2.js.map",
    external_url = nothing,
    dynamic = true,
    async = nothing,
    type = :js
)
            ]
        )

    )
end
end
