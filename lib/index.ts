import { TimelineProvider, TimelineHeaders, TimelineEvents } from 'lib/components';
import { TimelineCurrentTime, TimelineTimeIndicator } from 'lib/components/indicators';

export default {
  Provider: TimelineProvider,
  Headers: TimelineHeaders,
  Events: TimelineEvents,
  Indicators: {
    CurrentTime: TimelineCurrentTime,
    Time: TimelineTimeIndicator,
  },
};

export * from 'lib/components';
export * from 'lib/components/indicators';

export { useTimelineContext } from 'lib/components/TimelineProvider';
