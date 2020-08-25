import React, { Component } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";

import { Provider } from "react-redux";
import ItemModal from "./components/ItemModal";
import storeRedux from "./storeRedux";
import { Container } from "reactstrap";
import { loadUser } from "./action/authAction.jsx";

class App extends Component {
  componentDidMount() {
    storeRedux.dispatch(loadUser());
  }

  render() {
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
}
export default App;
