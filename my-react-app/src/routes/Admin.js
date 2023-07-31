import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input } from 'reactstrap';
import "../styles/admin.css";
import axios from 'axios';

class Admin extends React.Component {
  state = {
    showModal: false,
    precio: "",
    descripcion: ""
  };

  toggleModal = () => {
    this.setState((prevState) => ({
      showModal: !prevState.showModal,
    }));
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  GuardarReg = () => {
    const { precio, descripcion } = this.state;
    const data = { precio, descripcion };

    axios.post('http://localhost:8000/api/bebidas/', data) // Reemplaza esta URL con la URL real de la API que deseas llamar y la ruta adecuada para guardar los datos en tu backend
      .then(response => {
        console.log('Datos guardados exitosamente:', response.data);
      })
      .catch(error => {
        console.error('Error al guardar los datos:', error);
      });

    // Cerrar el modal después de guardar
    this.toggleModal();
  };

  render() {
    const { precio, descripcion } = this.state;
    return (
      <div className="admin">
        <h3>precio</h3>
        <Input type="number" name="precio" value={precio} onChange={this.handleChange} />
        <br></br>
        <h3>descripcion</h3>
        <Input type="text" name="descripcion" value={descripcion} onChange={this.handleChange} />
        <Button color="primary" onClick={this.toggleModal}>Guardar registro</Button>

        <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Confirmar Guardar</ModalHeader>
          <ModalBody>
            ¿Estás seguro de que deseas guardar el registro?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.GuardarReg}>Guardar</Button>{' '}
            <Button color="secondary" onClick={this.toggleModal}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Admin;
