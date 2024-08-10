
module DongjakDashComponents2
using Dash

const resources_path = realpath(joinpath( @__DIR__, "..", "deps"))
const version = "0.0.1"

include("jl/''_dongjakdashcomponents2.jl")

function __init__()
    DashBase.register_package(
        DashBase.ResourcePkg(
            "dongjak_dash_components2",
            resources_path,
            version = version,
            [
                DashBase.Resource(
    relative_package_path = "async-DongjakDashComponents2.js",
    external_url = "https://unpkg.com/dongjak_dash_components2@0.0.1/dongjak_dash_components2/async-DongjakDashComponents2.js",
    dynamic = nothing,
    async = :true,
    type = :js
),
DashBase.Resource(
    relative_package_path = "async-DongjakDashComponents2.js.map",
    external_url = "https://unpkg.com/dongjak_dash_components2@0.0.1/dongjak_dash_components2/async-DongjakDashComponents2.js.map",
    dynamic = true,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "dongjak_dash_components2.min.js",
    external_url = nothing,
    dynamic = nothing,
    async = nothing,
    type = :js
),
DashBase.Resource(
    relative_package_path = "dongjak_dash_components2.min.js.map",
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
