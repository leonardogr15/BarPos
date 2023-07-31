// ModalView.js

import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button,Input } from 'reactstrap';

class ModalCantidad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
  }

  handleQuantityChange = (event) => {
    this.setState({ quantity: event.target.value });
  };

  handleAddToSelectedItems = () => {
    const { item, onAddToSelectedItems, toggleModal } = this.props;
    const { quantity } = this.state;
    onAddToSelectedItems(item, parseInt(quantity, 10));
    toggleModal();
  };

  componentDidUpdate(prevProps) {
    // Resetear el valor de cantidad a 1 cada vez que se muestra la modal
    if (this.props.isOpen && !prevProps.isOpen) {
      this.setState({ quantity: 1 });
    }
  }

  

  render() {
    const { item, isOpen, toggleModal } = this.props;
    const { quantity } = this.state;

    return (
      <Modal isOpen={isOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Seleccionar cantidad</ModalHeader>
        <ModalBody className='modal-cantidad'>
          <h3>{item.title}</h3>
          <h3>{item.precio.toLocaleString('es-CO', {style: 'currency',currency: 'COP',minimumFractionDigits: 0,})}</h3>
          <div>
            <label>Cantidad:</label>
            <Input type="number" value={quantity} onChange={this.handleQuantityChange} />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.handleAddToSelectedItems}>Agregar</Button>
          <Button color="danger" onClick={toggleModal}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalCantidad;
