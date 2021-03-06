import React from 'react'

import { DATE_FORMAT, SIDEBAR_MODES, SIDEBAR_ROUTES } from '../constants'
import { Route, Switch, Redirect, Link } from 'react-router-dom'

const Sidebar = ({
    allReports,
    sidebarMode,
    setSidebarMode,
    selectedDate,
    setSelectedDate,
    selectedState,
    setSelectedState
}) => {
    const getSidebarTuples = () => {
        const mode = parseInt(sidebarMode)
        if (mode === 0) {
            return [];
        } else if (mode === 1) {
            return getUniqueDateCounts(allReports);
        } else {
            return getUniqueStateCounts(allReports);
        }
    }

    const handleSidebarModeClick = (num) => {
        setSidebarMode(parseInt(num))
    }

    const handleClickSidebarElem = (key) => {
        if (sidebarMode === 1) {
            setSelectedDate(key)
        } else {
            setSelectedState(key)
        }
    }

    const getUniqueStateCounts = (df) => {
        const rawStates = df.unique('state').transpose().toArray()[0];
        const counts = {}
        rawStates.forEach(d => {
            counts[d] = df.countValue(d, 'state')
        })
        return Object.keys(counts)
            .map(d => [d, counts[d], d])
            .sort((a, b) => a[0].localeCompare(b[0]))
    }

    // Return list of [dateString, count, epochTime] tuples
    const getUniqueDateCounts = (df) => {
        // Unique gets returned as a column; toArray returns as array-of-arrays
        const rawDates = df.unique('date').transpose().toArray()[0];
        const counts = {}
        rawDates.forEach(d => {
            counts[d] = df.countValue(d, 'date')
        })
        const tuples = Object.keys(counts)
            .map(k => parseInt(k))
            .map(d => [new Date(d), counts[d], d])
            .sort((a, b) => b[2] - a[2])
            .map(tuple => {
                let formatted;
                if (tuple[0].getFullYear() < 2020) {
                    formatted = 'Unknown Date'
                } else {
                    formatted = DATE_FORMAT.format(tuple[0])
                }
                return [formatted, tuple[1], tuple[2]]
            });
        return tuples;
    }

    const isSidebarElemSelected = (key) => {
        if (sidebarMode === 1) {
            return key === selectedDate
        } else {
            return key === selectedState
        }
    }

    return (
        <>
            {allReports !== null &&
                <>
                    <Switch>
                        <Route path="/">
                            <Redirect to="/bydate" />
                        </Route>
                    </Switch>
                    <div className="flex flex-col items-start mb-4">
                        {Object.keys(SIDEBAR_MODES).map(num => {
                            return (
                                <div key={num}
                                    className={`cursor-pointer px-2 py-1 rounded-md ${parseInt(num) === parseInt(sidebarMode) ? 'bg-orange-200' : ''}`}
                                    onClick={() => handleSidebarModeClick(num)}>
                                    <Link to={SIDEBAR_ROUTES[num]}>
                                        {SIDEBAR_MODES[num]}
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                    <div className="sidebar-list-line h-px bg-gray-300 my-4"></div>
                <div className="sidebar-list flex flex-col items-start overflow-y-scroll" style={{'max-height': '50vh'}}>
                        {getSidebarTuples().map(tuple =>
                            <div onClick={() => handleClickSidebarElem(tuple[2])}
                                className={`cursor-pointer px-2 py-1 rounded-md transition-all ease-linear duration-300 hover:text-black
                          ${isSidebarElemSelected(tuple[2]) ? 'font-semibold bg-orange-200 text-black' : 'text-gray-600'}`}
                                key={tuple[2]}>
                                <span>{tuple[0]}</span>
                                <span className={`ml-2 px-1 rounded-md ${isSidebarElemSelected(tuple[2]) ? 'bg-orange-400' : 'bg-gray-400'}`}>{tuple[1]}</span>
                            </div>)}
                    </div>
                    <div className="sidebar-list-line h-px bg-gray-300 my-4"></div>
                </>
            }
        </>
    )
}

export default Sidebar;
