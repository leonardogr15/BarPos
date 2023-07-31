import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Modal_view extends React.Component {
  state = {
    abierto: true,
  }

  abrirModal = () => {
    this.setState({ abierto: !this.state.abierto });
    this.props.onClose(true);
  }
  cerrarModal = () => {
    this.setState({ abierto: !this.state.abierto });
    this.props.onClose();
  }


  render() {
    const { abierto } = this.state;
    const modalStyles = {
      // position: "absolute",
      // top: '50%',
      // left: '50%',
      // transform: 'translate(-50%, -50%)',
      // width: '450px',
      // height: '300px',
    };
    const ModalBodyStyles = {
      // height: '80px',
      // marginTop: '30px',
      // marginBottom: '30px',
    };

    const ModalHeaderStyles = {
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '50px',
      marginBottom: '30px',
    };

    const inputStyles = {
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      border: '0.5px solid',
      borderRadius: '5px', 
      padding: '8px',
    };

    const ModalFooterStyles = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '50px',
    };
    const LoginStyles = {
      width:'120px',
      alignItems: 'center', 
      border: '0px',
      borderRadius:'5px' 
    };
    const CloseStyles = {
      width:'120px',
      alignItems: 'center', 
      backgroundColor:'#f01945',
      border: '0px',
      borderRadius:'5px'
    };


    return (
      <>
        <Modal isOpen={this.props.isVisible} style={modalStyles} >
          <ModalHeader style={ModalHeaderStyles}>
            INGRESE CODIGO
          </ModalHeader>
          <ModalBody style={ModalBodyStyles}>
            <FormGroup>
              {/* <Label for="password">Codigo</Label> */}
              <Input type="text" id="password" style={inputStyles} />
            </FormGroup>
          </ModalBody>

          <ModalFooter style={ModalFooterStyles}>
            <Button color="primary" style={LoginStyles} onClick={this.abrirModal}>Iniciar Sesión</Button>
            <Button color="secondary" onClick={this.cerrarModal} style={CloseStyles}>Cerrar</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

export default Modal_view;
