import { WorkLogProvider } from 'context';
import WorkLog from './WorkLog';

function WorkLogWithProvider(): JSX.Element {
  return (
    <WorkLogProvider>
      <WorkLog />
    </WorkLogProvider>
  );
}

export default WorkLogWithProvider;
