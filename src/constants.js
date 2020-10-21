const SIDEBAR_MODES = {
    0: 'Browse all',
    1: 'Browse by date',
    2: 'Browse by state',
}
const DATE_OPTIONS = { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }
const DATE_FORMAT = new Intl.DateTimeFormat('en-US', DATE_OPTIONS)

export { SIDEBAR_MODES, DATE_FORMAT, DATE_OPTIONS }
