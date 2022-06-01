import { TimelineProvider } from './context';
import { TimelineHeaders, TimelineEvents } from './components';
import { TimelineCurrentTime } from './components/indicators';

export default {
  Provider: TimelineProvider,
  Headers: TimelineHeaders,
  Events: TimelineEvents,
  Indicators: {
    CurrentTime: TimelineCurrentTime,
  },
};

export * from './context';
export * from './components';
export * from './components/indicators';
