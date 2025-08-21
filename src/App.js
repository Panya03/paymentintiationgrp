import './App.css';
import ProgressTracker from './components/ProgressTracker';
import FilterImplementation from './components/FilterImplementation';
import Dashboard from './components/Dashboard';
import HeaderRowApprover from './components/SubmitPayroll/HeaderRowApprover';
import SubmitApproval from './components/SubmitPayroll/SubmitApproval';

function App() {
  const role = "batching";

  return (
    <div className="App">
    <Dashboard role={role}>
      
        {role !== "batching" && <HeaderRowApprover />}
        <ProgressTracker role={role} />
        {role === "batching" ? (
          <FilterImplementation />
        ) : (
          <SubmitApproval />
        )}
      </Dashboard>
    </div>
  );
}

export default App;
