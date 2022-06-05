import React from 'react';
import ReactDOM from 'react-dom';
import { add, sub, format } from 'date-fns';
import faker from 'faker';
import Timeline from 'react-headless-timeline';
import Event from './Event';
import Header from './Header';

const now = new Date();

const timeline = {
  startDate: sub(now, { hours: 1, minutes: 25 }),
  endDate: add(now, { hours: 8, minutes: 50 }),
};

const makeEvents = () =>
  new Array(faker.datatype.number(4) + 1).fill(null).reduce<{ startDate: Date; endDate: Date }[]>((acc, _, i) => {
    const startDate = add(i ? acc[i - 1].endDate : timeline.startDate, {
      minutes: faker.datatype.number(60),
    });

    acc.push({
      startDate,
      endDate: add(startDate, { minutes: faker.datatype.number(60) + 30 }),
    });

    return acc;
  }, []);

function App() {
  return (
    <div style={{ position: 'relative', width: '80vw' }}>
      <Timeline.Provider startDate={timeline.startDate} endDate={timeline.endDate}>
        <>
          <div
            style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', boxSizing: 'border-box' }}
          >
            <Timeline.Headers
              render={({ headers, getHeaderStyles }) => (
                <>
                  {headers.map((header) => (
                    <Header key={header.getTime()} header={header} style={getHeaderStyles(header)} />
                  ))}
                </>
              )}
            />
          </div>

          <Timeline.Events
            render={({ getEventStyles }) => (
              <>
                {new Array(faker.datatype.number(10) + 1).fill(null).map((_, i) => (
                  <div key={i} style={{ position: 'relative', height: 30, paddingTop: !i ? 30 : 10 }}>
                    {makeEvents().map((evt, i) => (
                      <Event key={i} style={getEventStyles(evt)}>
                        <span>
                          {format(evt.startDate, 'HH:mm')} - {format(evt.endDate, 'HH:mm')}
                        </span>
                      </Event>
                    ))}
                  </div>
                ))}
              </>
            )}
          />
        </>
      </Timeline.Provider>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
