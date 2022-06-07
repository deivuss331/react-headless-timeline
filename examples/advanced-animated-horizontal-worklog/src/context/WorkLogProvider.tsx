import { createContext, useState } from 'react';
import { addDays, subDays } from 'date-fns';
import { generateWorkLogRecords } from 'utils';
import type { WorkLogRecord } from 'types';

const DEFAULT_ACTIVE_DATE: Date = new Date();

export interface ContextValue {
  activeDate: Date;
  records: WorkLogRecord[];
  handlePrevDay: () => void;
  handleNextDay: () => void;
}

export const WorkLogCtx = createContext<ContextValue | undefined>(undefined);

interface ProviderProps {
  children: React.ReactElement;
}

interface ProviderState {
  activeDate: ContextValue['activeDate'];
  records: ContextValue['records'];
}

function WorkLogProvider({ children }: ProviderProps): JSX.Element {
  const [state, setState] = useState<ProviderState>({
    activeDate: DEFAULT_ACTIVE_DATE,
    records: generateWorkLogRecords(DEFAULT_ACTIVE_DATE),
  });

  const handlePrevDay = () => {
    const newDate: Date = subDays(state.activeDate, 1);

    setState({
      activeDate: newDate,
      records: generateWorkLogRecords(newDate),
    });
  };

  const handleNextDay = () => {
    const newDate = addDays(state.activeDate, 1);

    setState({
      activeDate: newDate,
      records: generateWorkLogRecords(newDate),
    });
  };

  return (
    <WorkLogCtx.Provider
      value={{
        ...state,
        handlePrevDay,
        handleNextDay,
      }}
    >
      {children}
    </WorkLogCtx.Provider>
  );
}

export default WorkLogProvider;
