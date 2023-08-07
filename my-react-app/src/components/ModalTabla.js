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
    const { toggleModalTabla } = this.props;
    toggleModalTabla('items');
};

  componentDidUpdate(prevProps) {
    // Resetear el valor de cantidad a 1 cada vez que se muestra la modal
    if (this.props.isOpen && !prevProps.isOpen) {
      this.setState({ quantity: 1 });
    }
  }

  render() {
    const { selectedItems, isOpen, toggleModalTabla, selectedMesa } = this.props;
    const selectedItemsArray = Object.values(selectedItems);

    return (
      <Modal isOpen={isOpen} toggle={toggleModalTabla}>
        <ModalHeader toggle={toggleModalTabla}>Confirmar orden - Mesa #{selectedMesa}</ModalHeader>
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
          <Button color="primary" onClick={this.handleAddToSelectedItems}>Confirmar orden</Button>
          <Button color="danger" onClick={toggleModalTabla}>Cancelar</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ModalTabla;
