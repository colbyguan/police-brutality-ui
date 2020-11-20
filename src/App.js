import React, { useState, useEffect } from 'react';
import DataFrame from "dataframe-js";
import './App.css';
import { getOfficialAPIDataFrame } from './Client'
import Sidebar from './components/Sidebar'

const DATE_OPTIONS = { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC'}
const DATE_FORMAT = new Intl.DateTimeFormat('en-US', DATE_OPTIONS)
const CARD_DATE_OPTIONS = {
  year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC'}
const CARD_DATE_FORMAT = new Intl.DateTimeFormat('en-US', CARD_DATE_OPTIONS)

const LINK_STYLES = {
  'twitter': 'bg-blue-500 text-gray-100',
  'instagram': 'bg-pink-500 text-gray-100',
  'reddit': 'bg-orange-500 text-gray-100',
  'redd': 'bg-orange-500 text-gray-100',
  'tiktok': 'bg-red-500 text-gray-100'
}

function App() {
  const [errors, setErrors] = useState('')
  const [allReports, setAllReports] = useState(null)
  /* 0: Don't use sidebar
     1: Sidebar to enumerate dates
     2: Side bar to enumerate states
  */
  const [sidebarMode, setSidebarMode] = useState(1)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedState, setSelectedState] = useState(null)
  const [selectedIncidents, setSelectedIncidents] = useState([])

  useEffect(() => {
    getOfficialAPIDataFrame()
      .then(df => {
        setAllReports(df)
        setSelectedDate(getDefaultDate(df));
        setSelectedState(getDefaultState(df));
      })
      .catch(err => console.error(err))
  }, []);

  const getDefaultDate = df => {
    const uniqueDates = df.unique('date').transpose().toArray()[0];
    return uniqueDates.sort((a, b) => a - b)[uniqueDates.length - 1]
  }

  const getDefaultState = df => {
    const uniqueStates = df.unique('state').transpose().toArray()[0];
    return uniqueStates.sort()[0]
  }

  useEffect(() => {
    setIncidentsToCurrentFilters();
  }, [sidebarMode,selectedState, selectedDate])


  const setIncidentsToCurrentFilters = () => {
    if (allReports === null) {
      return;
    }
    let filtered = [];
    if (sidebarMode === 0) {
      filtered = allReports.toCollection()
      filtered.sort((a, b) => {
        if (b.date === a.date) {
          return a.state.localeCompare(b.state)
        } else {
          return (new Date(b.date) - new Date(a.date))
        }
      });
    } else if (sidebarMode === 1) {
      filtered = allReports.filter(row => row.get('date') === selectedDate).toCollection()
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
    } else if (sidebarMode === 2) {
      filtered = allReports.filter(row => row.get('state') === selectedState).toCollection()
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
    }
    setSelectedIncidents(filtered);
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

  const getLinkStyle = (link) => {
    let url;
    try {
      url = new URL(link)
    } catch (err) {
      return 'opacity-50 border border-gray-400'
    }
    for (const keyword of Object.keys(LINK_STYLES)) {
      if (url.host.includes(keyword)) {
        return LINK_STYLES[keyword]
      }
    }
    return 'bg-gray-400';
  }

  const getLinkLabel = (link) => {
    let url;
    try {
      url = new URL(link)
    } catch (err) {
      return '(bad link)'
    }
    if (url.host.includes('twitter.com') && url.pathname) {
      let tokens = url.pathname.split('/')
      let username;
      if (tokens.length >= 2) {
        username = tokens[1];
      }
      return '@' + username
    }
    if (url.host.startsWith("www.")) {
      return url.host.substring(4)
    }
    return url.host;
  }

  return (
    <div className="container mx-auto">
      <div className="my-6 text-3xl">Police Brutality During the 2020 George Floyd Protests</div>
      <div className="flex my-4">
        <div className="w-1/4">
          <Sidebar {... {allReports, sidebarMode, setSidebarMode, selectedDate, setSelectedDate, selectedState, setSelectedState }} />
        </div>
        <div className="w-3/4">
          {selectedIncidents.map(incident => {
            if (new Date(incident.date).getFullYear() < 2020) {
              incident.date = null
            }
            return (<div key={incident.pb_id} className="max-w-full rounded overflow-hidden border border-gray-400 mb-4">
              <div className="px-6 py-4">
                <div className="mb-2">
                  <span className="font-bold text-gray-800 mr-2">{!incident.date ? 'Unknown Date' : CARD_DATE_FORMAT.format(new Date(incident.date))}</span>
                  <span className="uppercase font-semibold text-sm text-gray-700 mr-1">{incident.city},</span>
                  <span className="uppercase font-semibold text-sm text-gray-600">{incident.state}</span>
                </div>
                <div className="mb-2">
                  <p>{incident.title ? incident.title : incident.name}</p>
                </div>
                <div>
                  <span className="uppercase font-bold text-gray-600 text-xs mr-2">Sources: </span>
                  {incident.links.map(link => {
                    return (<span className={`inline-block rounded-full px-3 py-1 mt-2 font-semibold text-sm mr-2 ${getLinkStyle(link)}`}>
                      <a target="_blank" rel="noopener noreferrer" href={link}>
                      {getLinkLabel(link)}</a></span>)
                  })}
                </div>
              </div>
            </div>)
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
