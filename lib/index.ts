import { TimelineProvider } from './context';
import { TimelineHeaders, TimelineEvents } from './components';
import { TimelineCurrentTime, TimelineTimeIndicator } from './components/indicators';

export default {
  Provider: TimelineProvider,
  Headers: TimelineHeaders,
  Events: TimelineEvents,
  Indicators: {
    CurrentTime: TimelineCurrentTime,
    Time: TimelineTimeIndicator,
  },
};

export * from './context';
export * from './components';
export * from './components/indicators';
