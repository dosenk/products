import React from 'react';
import './App.css';
import Header from './components/Header';
import Routes from './components/Routes';
// import { useAppDispatch, useAppSelector } from './hooks/redux';
// import { productApi, useFetchAppProductsQuery } from './services/ProducService';

const App = () => {
  return (
    <div className="App">
      <Header></Header>
      <main>
        <Routes />
      </main>
    </div>
  );
};

export default App;
