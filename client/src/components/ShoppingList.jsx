import React, { Component, useState } from 'react'
import { Container, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect } from 'react-redux'; // mengambil state pada redux ke react
import { getItem, deleteItem } from '../action/itemAction';
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

  // Validasi yang diimport oleh redux harus ada & sesuai
  // Agar tombol delete tidak muncul jika tidak login (isAuthenticated)
  static propTypes = {
    getItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  }


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
                  {this.props.isAuthenticated ? <Button className="remove-btn" color="danger" size="sm" onClick={this.onDeleteClick.bind(this, _id)} >&times;</Button> : null}
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

// memanggil state dalam itemReducer
const mapStateToProps = (state) => ({
  item: state.item,
  // state.item ==> item karena dipanggil memlalui reducer/index.jsx
  isAuthenticated: state.auth.isAuthenticated
});

// export default connect(state global(subscription) ,dispatch)(Counter);
export default connect(mapStateToProps, { getItem, deleteItem })(ShoppingList);
