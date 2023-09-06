import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Table } from 'reactstrap';

class ModalTabla extends React.Component {
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
    const { toggleModalTabla,selectedItems,selectedMesa } = this.props;
    const orden ={
      orden_items: selectedItems,
      mesa:selectedMesa
    }
    const validation_items = selectedMesa && Object.keys(selectedItems).length>=1 ? 'items' : 'no-items';
    toggleModalTabla(validation_items,orden||{});
};

  componentDidUpdate(prevProps) {
    // Resetear el valor de cantidad a 1 cada vez que se muestra la modal
    if (this.props.isOpen && !prevProps.isOpen) {
      this.setState({ quantity: 1 });
    }
  }

  render() {
    const { selectedItems, isOpen, toggleModalTabla, selectedMesa,show_buttom } = this.props;
    const selectedItemsArray = Object.values(selectedItems);

    return (
      <Modal isOpen={isOpen} toggle={toggleModalTabla} >
        <ModalHeader toggle={toggleModalTabla}>Orden - Mesa #{selectedMesa}</ModalHeader>
        <ModalBody className='modal-cantidad'>
          <Table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {/* Iterar sobre los elementos seleccionados y mostrarlos en la tabla */}
              {selectedItemsArray.map(item => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  {/* Replace 'cantidad' with the appropriate property in your object */}
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ModalBody>
        <ModalFooter>
          {show_buttom && ( // Condición para mostrar el botón si ordenes es true
              <Button color="primary" onClick={this.handleAddToSelectedItems}>Confirmar orden</Button>
          )}
          <Button color="danger" onClick={toggleModalTabla}>Cerrar</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalTabla;
