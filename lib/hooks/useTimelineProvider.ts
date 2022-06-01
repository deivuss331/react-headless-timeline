import { useContext } from 'react';
import type { TimelineContextValue } from '../context/TimelineProvider';
import { TimelineCtx } from '../context/TimelineProvider';
import { LibError } from '../utils';

const useTimelineProvider = (): TimelineContextValue => {
  const value: TimelineContextValue | undefined = useContext(TimelineCtx);

  if (!value) {
    throw new LibError('You forgot to wrap your timeline components with TimelineProvider!');
  }

  return value;
};

export default useTimelineProvider;
