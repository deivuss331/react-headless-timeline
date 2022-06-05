import React from 'react';
import ReactDOM from 'react-dom';
import Timeline from 'react-headless-timeline';
import { format } from 'date-fns';

function App() {
  const timelineConfig = {
    startDate: new Date(1651201447127), // 29th Apr 2022 05:04:07
    endDate: new Date(1651221447127), // 29th Apr 2022 10:37:27
  };

  const events = [
    {
      startDate: new Date(1651204649127), // 29th Apr 2022 05:57:29
      endDate: new Date(1651214649127), // 29th Apr 2022 08:44:09
    },
  ];

  return (
    <Timeline.Provider direction="vertical" {...timelineConfig}>
      <div style={{ display: 'flex', height: '80vh' }}>
        <Timeline.Headers
          render={({ headers, getHeaderStyles }) => (
            <div style={{ position: 'relative', height: '100%', width: 100 }}>
              {headers.map((header) => (
                <span key={header.getTime()} style={getHeaderStyles(header)}>
                  {format(header, 'do MMM yyyy HH:mm')}
                </span>
              ))}
            </div>
          )}
        />

        <Timeline.Events
          render={({ getEventStyles }) => (
            <div style={{ position: 'relative', height: '100%', width: 200 }}>
              {events.map((evt, i) => (
                <span key={i} style={{ border: '1px solid black', boxSizing: 'border-box', ...getEventStyles(evt) }}>
                  Event
                </span>
              ))}
            </div>
          )}
        />
      </div>
    </Timeline.Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
