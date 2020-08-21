import React, { Component, useState } from 'react'
import { Container, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { v4 } from 'uuid';
import { connect } from 'react-redux'; // mengambil state pada redux ke react
import { getItem, deleteItem } from '../action/ItemAction';
import PropTypes from 'prop-types';

// const ShoppingList = () => {
//   const [items, setItems] = useState([
//     { id: v4(), name: 'Eggs' },
//     { id: v4(), name: 'Milk' },
//     { id: v4(), name: 'Water' },
//     { id: v4(), name: 'Steak' },
//   ], [])

//   const handleAdd = () => {
//     const name = prompt('Enter Item')
//     if (name) {
//       setItems(items.concat({ id: v4(), name }))
//     }
//   }

class ShoppingList extends Component {

  // Fetchh data / mengambil data initialState/global
  componentDidMount() {
    this.props.getItem();
  }

  // Delete
  onDeleteClick = (id) => {
    this.props.deleteItem(id);
  }

  render() {
    // items yang di map dari initialState
    const { items } = this.props.item;
    return (
      <Container>
        {/* Animasi terhapus */}
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button className="remove-btn" color="danger" size="sm" onClick={this.onDeleteClick.bind(this, _id)} >&times;</Button>
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    )
  }
}

// Validasi yang diimport oleh redux harus ada & sesuai
ShoppingList.propTypes = {
  getItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired
}

// memanggil state dalam itemReducer
const mapStateToProps = (state) => ({
  item: state.item
  // state.item ==> item karena dipanggil memlalui reducer/index.jsx
});

// export default connect(state global(subscription) ,dispatch)(Counter);
export default connect(mapStateToProps, { getItem, deleteItem })(ShoppingList);
