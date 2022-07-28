import { useContext } from 'react';
import type { TimelineContextValue } from '../context/TimelineProvider';
import { TimelineCtx } from '../context/TimelineProvider';
import { LibError } from '../utils';

const useTimelineProvider = (): TimelineContextValue => {
  const value: TimelineContextValue | undefined = useContext(TimelineCtx);

  if (!value) {
    throw new LibError('"useTimelineContext" hook cannot be used outside the Timeline context!');
  }

  return value;
};

export default useTimelineProvider;
