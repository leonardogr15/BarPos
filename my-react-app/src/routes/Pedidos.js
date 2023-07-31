import React from 'react';
import Modal_view from "../components/Modal_view";
import { Button } from 'reactstrap';
import ViewPanels from"../components/view_panels"

class Pedidos extends React.Component {
  state = {
    isVisible: true // Establecer el estado inicial en verdadero
  };

  // Función para abrir la modal
  handleOpenModal = () => {
    this.setState({ isVisible: true });
  };

  // Función para cerrar la modal
  handleCloseModal = (a = false) => {
    this.setState({ isVisible: false, alfa: a });
  };

  render() {
    const { isVisible, alfa } = this.state; // Obtener el estado isVisible desde el estado local de la clase
    return (
      <div className="pedidos">
        <div >
          <div>
            {alfa ? (
              <ViewPanels/>
            ) : (
              <div style={{ justifyContent: 'center' }}>
                Por favor, debe ingresar el código <br/><br/>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button color="primary" size="lg" onClick={this.handleOpenModal}>Ingresar Código</Button>
                </div>
              </div>
            )}
            <Modal_view isVisible={isVisible} onClose={this.handleCloseModal} />
          </div>
        </div>
      </div>
    );
  }
}

export default Pedidos;
