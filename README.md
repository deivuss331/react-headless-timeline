# ⚡️ React Headless Timeline

Headless components for building custom timelines for React. Headless means it doesn't provide any UI for the timeline but only handles the logic. Supports both horizontal and vertical timelines.

### Features

---

* ⚡️ Highly performant and efficient
* 🔒 Type safe - written in TypeScript
* 🫧 Doesn't render any UI - it's up to you how you're going to style your timeline
* 🏃‍ Small bundle size
* 🧪 Well tested - tests cover 100% of code

### Overview

---

See what library **does** and what **doesn't** for you to decide whether it's a good fit for you or not.

**👍 What it does for you:**
* Handles the timeline logic
* Helps you render timeline components in correct position and size

**👎 What it doesn't for you:**
* It doesn't provide any pre-made UI components for you (no need to overwrite any styles to make timeline looks like in designer's dream)

Still not sure? Check some [examples ⬇️](#examples)

### 📖 Content

---

* [Features](#features)
* [Overview](#overview)
* [Install](#install)
* [Quick start](#quick-start)
* [API](#api)
  * [Timeline Provider](#timelineprovider)
  * [Timeline Headers](#timelineheaders)
  * [Timeline Events](#timelineevents)
  * [Timeline Current Time Indicator](#timelineindicatorscurrenttime)
* [Rules](#rules)
* [Examples](#examples)

### Install

---

```bash
npm install react-headless-timeline
```

### Quick start

---

```jsx
import Timeline from 'react-headless-timeline';

function App() {
  const timelineConfig = {
    startDate: new Date(1651201447127), // 29th Apr 2022 05:04:07 CET
    endDate: new Date(1651221447127), // 29th Apr 2022 10:37:27 CET
  }

  const events = [
    { 
      startDate: new Date(1651204649127), // 29th Apr 2022 05:57:29 CET
      endDate: new Date(1651214649127), // 29th Apr 2022 08:44:09 CET
    },
  ];
  
  return (
    <Timeline.Provider {...timelineConfig}>
      <>
        <Timeline.Headers
          render={({ headers, getHeaderStyles }) => (
            <div style={{ position: 'relative', width: '100%', height: 30 }}>
              {headers.map((header) => (
                <span key={header.getTime()} style={getHeaderStyles(header)}>
                  {header.getTime()}
                </span>
              ))}
            </div>
          )}
        />

        <Timeline.Events
          render={({ getEventStyles }) => (
            <div style={{ position: 'relative', width: '100%', height: 30 }}>
              {events.map((evt, i) => (
                <span key={i} style={getEventStyles(evt)}>
                  Event
                </span>
              ))}
            </div>
          )}
        />
      </>
    </Timeline.Provider>
  );
}
```

### API

---

* #### Timeline.Provider

  Core timeline component. Provides common props for it's children.

  | Property | Required? | Type / value                            | Default value | Description           |
  |---------|-----------|-----------------------------------------|---------------|-----------------------|
  | startDate | Yes       | `Date`                                  |               | Timeline's start date |
  | endDate | Yes       | `Date`                                  |               | Timeline's end date   |
  | direction | No        | `"horizontal"` / `"vertical"` |  `"horizontal"` | Determines timeline direction |
  
  ```jsx
  import Timeline from 'react-headless-timeline';
  
  // ...
  
  <Timeline.Provider startDate={new Date()} endDate={new Date()} direction="horizontal">
    {children}
  </Timeline.Provider>
  ```
  
  ---

* #### Timeline.Headers

  Provides headers and helper function to generate headers CSS styles (size and position).

  | Property | Required? | Type       | Default value | Min. value | Description                                          |
  | --- |-----------|------------|---------------|------------|------------------------------------------------------|
  | cells | No        | `number`   | 2             | 2          | Determines how many headers/cells you want to render |
  | render | Yes       | `function` |               | | Render prop function. See example below...           |

  Example:

  ```jsx
  import Timeline from 'react-headless-timeline';
  
  // ...
  
  <Timeline.Headers
    render={({ headers, getHeaderStyles }) => (
      <div>
        {headers.map((header) => (
          <span key={header.getTime()} style={getHeaderStyles(header)}>
            {header.getTime()}
          </span>
        ))}
      </div>
    )}
  />
  ```
  
  ---

* #### Timeline.Events

  Provides helper function to generate event CSS styles (size and position).

  | Property | Required? | Type       | Default value | Min. value | Description                                          |
  | --- |-----------|------------|---------------|------------|------------------------------------------------------|
  | render | Yes       | `function` |               | | Render prop function. See example below...           |

  Example:

  ```jsx
  import Timeline from 'react-headless-timeline';
  
  // ...
  
  <Timeline.Events
    render={({ getEventStyles }) => (
      <div>
        {events.map((evt, i) => (
          <span key={i} style={getEventStyles(evt)}>
            Event
          </span>
        ))}
      </div>
    )}
  />
  ```
  
  ---
  
* #### Timeline.Indicators.CurrentTime

  Provides current time indicator with update every second or full minute.
  
  | Property | Required? | Type / value | Default value | Description |
  | --- | --- | --- | --- | --- |
  | updateInterval | No | `"second"` / `"minute"` | `"minute"` | Determines update interval. In most cases you'll want to use `"minute"` option to limit re-renders |
  | render | Yes | `function` | | Render prop function. See example below... |
  
  Example:

  ```jsx
  import Timeline from 'react-headless-timeline';
  
  // ...
  
  <Timeline.Indicators.CurrentTime
    render={({ currentTime, styles }) => (
      <div style={{ height: '100%', ...styles }}>
        <StyledHeader>{currentTime.getTime()}</StyledHeader>
      </div>
    )}
  />
  ```

  ---
  
### Rules

---

* You should use CSS `box-sizing: border-box` on your timeline components to prevent sizing bugs.

### Examples

---

TODO
