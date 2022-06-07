# ⚡️ React Headless Timeline

Headless components for building custom timelines for React. Headless means it doesn't provide any UI for the timeline but only handles the logic. Supports both horizontal and vertical timelines.

<div style="display: grid; place-items: center;">
 <div style="width: 100%; max-width: 1920px;">
  <img src="https://raw.githubusercontent.com/deivuss331/react-headless-timeline/main/react-headless-timeline-demo.png" alt="React Headless Timeline" />
 </div>
</div>

### Features

---

* ⚡️ Highly performant and efficient
* 🔒 Type safe - written in TypeScript
* 🫧 Doesn't render any UI - it's up to you how you're going to style your timeline
* 🏃‍ Small bundle size

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
* [License](https://github.com/deivuss331/react-headless-timeline/blob/main/LICENSE)

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

  Core timeline component. You have to wrap all of your timeline components inside provider.
  
  **Props:** (* - these are required)

  | Name | Type                          | Default | Description           |
  |---------|-----------------------------------------|---------------|-----------------------|
  | startDate * | `Date`                                  |               |  |
  | endDate * | `Date`                                  |               |    |
  | direction | `"horizontal"` / `"vertical"` |  `"horizontal"` | Determines timeline direction |
  
  **Example:**
  
  ```jsx
  import Timeline from 'react-headless-timeline';
  
  // ...
  
  <Timeline.Provider startDate={startDate} endDate={endDate} direction="horizontal">
    {children}
  </Timeline.Provider>
  ```
  
  ---

* #### Timeline.Headers

  Provides headers and helper function to generate headers CSS styles (size and position).
  
  **Props:** (* - these are required)

  | Name  | Type       | Default | Description                                          |
  | --- |------------|---------------|------------------------------------------------------|
  | cells | `number`   | 2         | Determines how many headers/cells you want to render. For example if you have a timeline with `startDate` set to today 10AM and `endDate` set to today 4PM, by default headers will be an array with `startDate` and `endDate`. But let's say you want to display headers every 1 hour, you should then set cells to `7` - [10AM, 11AM, 12AM, 1PM, 2PM, 3PM, 4PM] |
  | render * |  `function` |               | Render your UI inside this function. See example below...          |

  **Example:**

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
  
  **Props:** (* - these are required)

  | Name  | Type       | Default | Description                                          |
  | --- |-----------|------------|------------------------------------------------------|
  | render * |  `function` |   | Render your UI inside this function. See example below...          |

  **Example:**

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

  Provides current time indicator with updates (re-renders) every second or full minute. This component will re-render itself.
  
  Update every full minute means update at 10:45:00, 10:46:00 and so on...
  
  **Props:** (* - these are required)
  
  | Name  | Type | Default | Description |
  | ---  | --- | --- | --- |
  | updateInterval | `"second"` / `"minute"` | `"minute"` | Determines update interval. In most cases you'll want to use `"minute"` option to limit re-renders |
  | render * | `function` | | Render your UI inside this function. See example below...   |
  
  **Example:**

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

* [Basic horizontal](https://githubbox.com/deivuss331/react-headless-timeline/tree/main/examples/basic-horizontal)
* [Basic vertical](https://githubbox.com/deivuss331/react-headless-timeline/tree/main/examples/basic-vertical)
* [Horizontal with current time indicator](https://githubbox.com/deivuss331/react-headless-timeline/tree/main/examples/horizontal-current-time)
* [Horizontal with multiple events](https://githubbox.com/deivuss331/react-headless-timeline/tree/main/examples/horizontal-multiple-events)
* [Vertical with current time indicator](https://githubbox.com/deivuss331/react-headless-timeline/tree/main/examples/vertical-current-time)
* [Vertical with multiple events](https://githubbox.com/deivuss331/react-headless-timeline/tree/main/examples/vertical-multiple-events)
* [Advanced horizontal work log](https://githubbox.com/deivuss331/react-headless-timeline/tree/main/examples/advanced-horizontal-worklog)
