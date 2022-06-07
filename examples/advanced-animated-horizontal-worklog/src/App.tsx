import AppProviders from 'providers/AppProviders';
import WorkLog from 'views/WorkLog';

function App(): JSX.Element {
  return (
    <AppProviders>
      <WorkLog />
    </AppProviders>
  );
}

export default App;
