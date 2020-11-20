const SIDEBAR_MODES = {
    0: 'Browse all',
    1: 'Browse by date',
    2: 'Browse by state',
}
const SIDEBAR_ROUTES = {
    0: '/all',
    1: '/bydate',
    2: '/bystate',
}
const DATE_OPTIONS = { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }
const DATE_FORMAT = new Intl.DateTimeFormat('en-US', DATE_OPTIONS)

export { SIDEBAR_MODES, SIDEBAR_ROUTES, DATE_FORMAT, DATE_OPTIONS }
