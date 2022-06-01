# ⚡️ React Headless Timeline

Headless components for building custom timelines for React. Headless means it doesn't provide any UI for the timeline but only handle the logic. Supports both horizontal and vertical timelines.

### Features

---

* ⚡️ Highly performant and efficient
* 🔒 Type safe - written in TypeScript
* 🫧 Doesn't render any UI. It's up to you how you're going to style your timeline.
* 🏃‍ Small bundle size

### Overview

---

See what library **does** and what **doesn't** for you to decide whether it's a good fit for you or not.

**👍 What it does for you:**
* Handles the timeline logic
* Helps you render timeline components in correct position and size

**👎 What it doesn't for you:**
* It doesn't provide any pre-made UI components for you (no need to overwrite any styles to make timeline looks like in designer's dream)

Still not sure? Check some [demos ⬇️](#demos)

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
    startDate: new Date(1651201447127), // 29th Apr 2022 05:04:07
    endDate: new Date(1651221447127), // 29th Apr 2022 10:37:27
  }

  const events = [
    { 
      startDate: new Date(1651204649127), // 29th Apr 2022 05:57:29
      endDate: new Date(1651214649127), // 29th Apr 2022 08:44:09
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

#### TimelineProvider

| Property | Required? | Type / value                            | Default value | Description           |
|---------|-----------|-----------------------------------------|---------------|-----------------------|
| startDate | Yes       | `Date`                                  |               | Timeline's start date |
| endDate | Yes       | `Date`                                  |               | Timeline's end date   |
| direction | No        | `"horizontal"` / `"vertical"` |  `"horizontal"` | Determines timeline direction |

#### TimelineHeaders

| Property | Required? | Type       | Default value | Min. value | Description                                          |
| --- |-----------|------------|---------------|------------|------------------------------------------------------|
| cells | No        | `number`   | 2             | 2          | Determines how many headers/cells you want to render |
| render | Yes       | `function` |               | | Render prop function. See example below...           |

Render function example:

```jsx
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

#### TimelineEvents

| Property | Required? | Type       | Default value | Min. value | Description                                          |
| --- |-----------|------------|---------------|------------|------------------------------------------------------|
| render | Yes       | `function` |               | | Render prop function. See example below...           |

Render function example:

```jsx
<Timeline.Events
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

### Demos

---

TODO

### Future goals

---

This library is under active development. Current future goals are:

* Detection of collision between events (one event is overlapping with the other one)