import { useContext } from 'react';
import type { ContextValue } from 'context/WorkLogProvider';
import { WorkLogCtx } from 'context/WorkLogProvider';

const useWorkLogCtx = (): ContextValue => {
  const value: ContextValue | undefined = useContext(WorkLogCtx);

  if (!value) {
    throw new Error('useWorkLogCtx cannot be used outside WorkLogCtx');
  }

  return value;
};

export default useWorkLogCtx;
