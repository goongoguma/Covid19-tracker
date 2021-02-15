import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Container from "./components/Container";
import './styles/container.scss';
import './styles/modal.scss';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>COVID-19 <i className="fas fa-virus" style={{color: "#8b0000"}} /> TRACKER</h1>
        <Container />
      </div>
    </QueryClientProvider>
  );
}

export default App;
