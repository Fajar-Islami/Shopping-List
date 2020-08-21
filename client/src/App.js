import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";

import { Provider } from "react-redux";
import storeRedux from "./store";
import ItemModal from "./components/ItemModal";
import { Container } from "reactstrap";

function App() {
  return (
    <Provider store={storeRedux}>
      <div className="App">
        {/* <h1>Hello</h1> */}
        <AppNavbar />
        <Container>
          <ItemModal />
          <ShoppingList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
