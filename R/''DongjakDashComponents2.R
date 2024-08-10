# AUTO GENERATED FILE - DO NOT EDIT

#' @export
''DongjakDashComponents2 <- function(id=NULL, label=NULL, test=NULL, value=NULL) {
    
    props <- list(id=id, label=label, test=test, value=value)
    if (length(props) > 0) {
        props <- props[!vapply(props, is.null, logical(1))]
    }
    component <- list(
        props = props,
        type = 'DongjakDashComponents2',
        namespace = 'dongjak_dash_components2',
        propNames = c('id', 'label', 'test', 'value'),
        package = 'dongjakDashComponents2'
        )

    structure(component, class = c('dash_component', 'list'))
}
