import React, { useState, useEffect } from 'react';
import DataFrame from "dataframe-js";
import './App.css';
import { getReportsDataFrame } from './Client'

const DATE_OPTIONS = { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC'}
const DATE_FORMAT = new Intl.DateTimeFormat('en-US', DATE_OPTIONS)
const CARD_DATE_OPTIONS = {
  year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC'}
const CARD_DATE_FORMAT = new Intl.DateTimeFormat('en-US', CARD_DATE_OPTIONS)
const SIDEBAR_MODES = {
  0: 'Browse all',
  1: 'Browse by date',
  2: 'Browse by state',
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
    getReportsDataFrame()
      .then(df => {
        setAllReports(df)
        setSelectedDate(getUniqueDateCounts(df)[0][2])
        setSelectedState(getUniqueStateCounts(df)[0][2])
      })
      .catch(err => console.error(err))
  }, []);

  useEffect(() => {
    if (allReports === null) {
      return;
    }
    let filtered = [];
    if (sidebarMode === 1) {
      filtered = allReports.filter(row => row.get('date') === selectedDate).toCollection()
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
    } else if (sidebarMode === 2) {
      filtered = allReports.filter(row => row.get('state') === selectedState).toCollection()
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
    }
    console.log(filtered);
    setSelectedIncidents(filtered);
  }, [selectedState, selectedDate])

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

  const getUniqueDateCounts = (df) => {
    // Unique gets returned as a column; toArray returns as array-of-arrays
    const rawDates = df.unique('date').transpose().toArray()[0];
    const counts = {}
    rawDates.forEach(d => {
      counts[d] = df.countValue(d, 'date')
    })
    return Object.keys(counts)
      .map(d => [new Date(d), counts[d], d])
      .sort((a, b) => b[0] - a[0])
      .map(tuple => {
        let formatted;
        if (tuple[0].getFullYear() < 2020) {
          formatted = 'Unknown Date'
        } else {
          formatted = DATE_FORMAT.format(tuple[0])
        }
        return [formatted, tuple[1], tuple[2]]
      });
  }

  const isSidebarElemSelected = (key) => {
    if (sidebarMode === 1) {
      return key === selectedDate
    } else {
      return key === selectedState
    }
  }

  return (
    <div className="container mx-auto">
      <div className="my-6 text-3xl">Police Brutality During the 2020 George Floyd Protests</div>
      <div className="flex my-4">
        <div className="w-1/4">
          {allReports !== null &&
            <>
              <div className="flex flex-col items-start mb-4">
                {Object.keys(SIDEBAR_MODES).map(num => {
                  return <div key={num}
                              className={`px-2 py-1 rounded-md ${parseInt(num) === parseInt(sidebarMode) ? 'bg-orange-200': ''}`}
                              onClick={() => handleSidebarModeClick(num)}>
                              {SIDEBAR_MODES[num]}</div>
                })}
              </div>
              <div className="flex flex-col items-start">
                {getSidebarTuples().map(tuple =>
                  <div onClick={() => handleClickSidebarElem(tuple[2])} className={`px-2 py-1 rounded-md ${isSidebarElemSelected(tuple[2]) ? 'bg-orange-200' : ''}`} key={tuple[2]}>
                    <span>{tuple[0]}</span>
                    <span className="ml-2 px-1 bg-orange-400 rounded-md">{tuple[1]}</span>
                  </div>)}
              </div>
            </>
          }
        </div>
        <div className="w-3/4">
          {selectedIncidents.map(incident => {
            return (<div key={incident.pb_id} className="max-w-full rounded overflow-hidden border border-gray-400 mb-4">
              <div className="px-6 py-4">
                <div className="mb-2">
                  <span className="font-bold text-gray-800 mr-2">{CARD_DATE_FORMAT.format(new Date(incident.date))}</span>
                  <span className="text-gray-700 mr-1">{incident.city},</span>
                  <span className="text-gray-600">{incident.state}</span>
                </div>
                <div>
                  <p>{incident.title}</p>
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
