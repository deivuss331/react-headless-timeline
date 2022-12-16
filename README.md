# ⚡️ React Headless Timeline

Headless components for building custom timelines for React. Headless means it doesn't provide any UI or styles for the timeline but only handles the logic. Supports both horizontal and vertical timelines.

[![🚀 Test, build and publish](https://github.com/deivuss331/react-headless-timeline/actions/workflows/test-and-publish.yml/badge.svg)](https://github.com/deivuss331/react-headless-timeline/actions/workflows/test-and-publish.yml)
<a href="https://www.npmjs.com/package/react-headless-timeline">
 <img src="https://badgen.net/npm/v/react-headless-timeline" alt="" />
</a>
<a href="https://www.npmjs.com/package/react-headless-timeline">
 <img src="https://img.shields.io/npm/dt/react-headless-timeline" alt="" />
 </a>
 <a href="https://bundlephobia.com/package/react-headless-timeline@latest">
 <img src="https://badgen.net/bundlephobia/minzip/react-headless-timeline@latest" alt="" />
 </a>
 <a href="https://bundlephobia.com/package/react-headless-timeline@latest">
 <img src="https://badgen.net/bundlephobia/tree-shaking/react-headless-timeline@latest" alt="" />
 </a>
 <a href="https://www.npmjs.com/package/react-headless-timeline">
 <img src="https://badgen.net/npm/license/react-headless-timeline" alt="" />
</a>

<div style="display: grid; place-items: center;">
 <div style="width: 100%; max-width: 1920px;">
  <img src="https://raw.githubusercontent.com/deivuss331/react-headless-timeline/main/react-headless-timeline-demo.png" alt="React Headless Timeline" />
 </div>
</div>

### Features ✨

---

* ⚡️ Highly performant and efficient
* 🔒 Type safe - written in TypeScript
* 🫧 Doesn't render any UI nor styles - it's totally up to you how you're going to style your timeline
* 🧩 Supports horizontal and vertical timelines
* 🏃‍ Small bundle size

### Overview 👓

---

See what this library **does** and **doesn't** for you and decide whether it's a good fit for you or not.

**👍 What it does for you:**
* It handles the timeline logic
* It helps you render timeline components in correct position and size

**👎 What it doesn't for you:**
* It doesn't provide any pre-styled UI components for you (no need to overwrite styles to make timeline looks like in designer's dream)

Still not sure? Check some [examples ⬇️](#examples)

### Content 📖

---

* [Features](#features)
* [Overview](#overview)
* [Install](#install)
* [Quick start](#quick-start)
* [API](#api)
  * [Timeline.Provider](#timelineprovider)
  * [Timeline.Headers](#timelineheaders)
  * [Timeline.Events](#timelineevents)
  * [Timeline.Indicators.CurrentTime](#timelineindicatorscurrenttime)
  * [Timeline.Indicators.Time](#timelineindicatorstime)
* [General rules](#general-rules)
* [Examples](#examples)
* [License](https://github.com/deivuss331/react-headless-timeline/blob/main/LICENSE)

### Install 🔌

---

```bash
npm install react-headless-timeline
```

### Quick start 👨‍💻

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

### API 📚

---

* #### Timeline.Provider

  Core timeline component. You have to wrap all of your timeline components inside provider.
  
  **Props:** (* - these are required)

  | Name | Type                          | Default | Description                   |
  |---------|-----------------------------------------|-------------------------------|-----------------------|
  | startDate * | `Date`                                  |               | **Should be memoized**        |
  | endDate * | `Date`                                  |               | **Should be memoized**                               |
  | direction | `"horizontal"` / `"vertical"` |  `"horizontal"` | Determines timeline direction |

  **Example:**
  
  ```jsx
  import Timeline from 'react-headless-timeline';
  
  // ...
  
  <Timeline.Provider startDate={startDate} endDate={endDate} direction="horizontal">
    {children}
  </Timeline.Provider>
  ```

  **Other examples:** [See all ⬇️](#examples)
  
  ----

* #### Timeline.Headers

  Provides headers and helper function to generate headers CSS styles (size and position).
  
  **Props:** (* - these are required)

  | Name  | Type       | Default | Description                                                                                                                                                                                                                                                                                                                                                                               |
  | --- |------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------|
  | cells | `number`   | 2         | Determines how many headers/cells you want to render. For example if you have a timeline with `startDate` set to today 10AM and `endDate` set to today 4PM, by default headers will be an array with `startDate` and `endDate`. But let's say you want to display headers every 1 hour, you should then set cells to `7` - [10AM, 11AM, 12AM, 1PM, 2PM, 3PM, 4PM]. The minimum value is 2 |
  | render * |  `function` |               | Render your UI inside this function. See example below...                                                                                                                                                                                                                                                                                                                                 |

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

  **Other examples:** [See all ⬇️](#examples)
  
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

  **Other examples:** [See all ⬇️](#examples)
  
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

  **Other examples:**
  * [Horizontal with current time indicator](https://githubbox.com/deivuss331/react-headless-timeline/tree/main/examples/horizontal-current-time)
  * [Horizontal with multiple events and time indicators](https://githubbox.com/deivuss331/react-headless-timeline/tree/main/examples/horizontal-time-indicator)
  * [Vertical with current time indicator](https://githubbox.com/deivuss331/react-headless-timeline/tree/main/examples/vertical-current-time)
  * [Advanced horizontal work log](https://githubbox.com/deivuss331/react-headless-timeline/tree/main/examples/advanced-horizontal-worklog)

    ---

* #### Timeline.Indicators.Time

  This indicator exposes function to position your component properly. It's useful for events without end date.

  **Props:** (* - these are required)

  | Name  | Type | Default | Description |
    | ---  | --- | --- | --- |
  | render * | `function` | | Render your UI inside this function. See example below...   |

  **Example:**

  ```jsx
  import Timeline from 'react-headless-timeline';
  
  // ...
  
  <Timeline.Indicators.Time
    render={({ getIndicatorStyles }) => (
      <div style={{ height: '100%', ...getIndicatorStyles(date) }}>
        <StyledHeader>
          {label}
        </StyledHeader>
      </div>
    )}
  />
  ```

  **Other examples:**
  * [Horizontal with multiple events and time indicators](https://githubbox.com/deivuss331/react-headless-timeline/tree/main/examples/horizontal-time-indicator)


  ---
  
### General rules 📝

---

* You should use CSS `box-sizing: border-box` on your timeline components to prevent sizing bugs.

### Examples 🧩

---

* [Basic horizontal](https://githubbox.com/deivuss331/react-headless-timeline/tree/main/examples/basic-horizontal)
* [Basic vertical](https://githubbox.com/deivuss331/react-headless-timeline/tree/main/examples/basic-vertical)
* [Horizontal with current time indicator](https://githubbox.com/deivuss331/react-headless-timeline/tree/main/examples/horizontal-current-time)
* [Horizontal with multiple events](https://githubbox.com/deivuss331/react-headless-timeline/tree/main/examples/horizontal-multiple-events)
* [Horizontal with multiple events and time indicators](https://githubbox.com/deivuss331/react-headless-timeline/tree/main/examples/horizontal-time-indicator)
* [Vertical with current time indicator](https://githubbox.com/deivuss331/react-headless-timeline/tree/main/examples/vertical-current-time)
* [Vertical with multiple events](https://githubbox.com/deivuss331/react-headless-timeline/tree/main/examples/vertical-multiple-events)
* Advanced horizontal work log:
  * [Source code](https://github.com/deivuss331/react-headless-timeline/tree/main/examples/advanced-horizontal-worklog)
  * [Live example](https://deivuss331.github.io/react-headless-timeline/)

### Roadmap 🗺

---

* Create detailed documentation
* Add more advanced examples of usage of `react-headless-timeline`
* (?) Add support for overflow timelines
* (?) Add possibility to create virtualized timelines

### License 📜

---

[MIT](https://github.com/deivuss331/react-headless-timeline/blob/main/LICENSE)