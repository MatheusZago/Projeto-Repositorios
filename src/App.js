import React from "react";

import Caminhos from './routes';
import GlobalStyle from './styles/global'


function App() {
  return (
    //Isso é uma tag fragment, é usada só para o GlobalStyle funcionar, ele tem que estar dentro de algo
    <>
    <GlobalStyle/>
    <Caminhos/>
    </>
  );
}

export default App;
