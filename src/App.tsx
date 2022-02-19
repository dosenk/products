import React from 'react';
import './App.scss';
import Header from './components/Header';
import Routes from './components/Routes';
// import { useAppDispatch, useAppSelector } from './hooks/redux';
// import { productApi, useFetchAppProductsQuery } from './services/ProducService';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes />
    </div>
  );
};

export default App;
