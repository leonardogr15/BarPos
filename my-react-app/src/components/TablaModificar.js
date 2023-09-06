import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Table, Input } from 'reactstrap';
import axios from 'axios';

class ModalTablaModificar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nuevasCantidades: [],
            nuevaMesa: this.props.selectedMesa,
        };
    }

    handleInputChange = (event, index) => {
        const { value } = event.target;
        const { nuevasCantidades } = this.state;
        nuevasCantidades[index] = parseInt(value, 10);
        this.setState({ nuevasCantidades });
    };

    handleModificarOrden = async (id_item) => {
        const { toggleModalTablaMod, selectedMesa, orden_id } = this.props;
        const { nuevasCantidades, nuevaMesa } = this.state;
        const nuevasCantidadesObj = {};
        nuevasCantidades.forEach((cantidad, index) => {
            const { selectedItems } = this.props;
            const selectedItemsArray = Object.values(selectedItems);
            const itemId = selectedItemsArray[index].id;
            nuevasCantidadesObj[itemId] = { quantity: cantidad };
        });

        try {
            await axios.put(`http://localhost:8000/orden-api/ordenes-put/${orden_id}/`, {
                orden_items: nuevasCantidadesObj,
                nueva_mesa: nuevaMesa || selectedMesa,
                item_delete: id_item
            });
            toggleModalTablaMod(false); 
        } catch (error) {
            console.error('Error al modificar la orden:', error);
        }
    };

    render() {
        const { isOpen, toggleModalTablaMod, selectedItems, selectedMesa, consecutivo } = this.props;
        const { nuevasCantidades, nuevaMesa } = this.state;
        const selectedItemsArray = Object.values(selectedItems);

        return (
            <Modal isOpen={isOpen} toggle={() => toggleModalTablaMod(false)}>
                <ModalHeader toggle={() => toggleModalTablaMod(false)}>Modificar Orden# {consecutivo}</ModalHeader>
                <ModalBody className='modal-cantidad'>
                    <Table>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Cantidad</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedItemsArray.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>
                                        <Input
                                            type="text"
                                            name="nuevaCantidad"
                                            value={nuevasCantidades[index] || item.quantity}
                                            onChange={(event) => this.handleInputChange(event, index)}
                                            placeholder={`Cantidad actual: ${item.quantity}`}
                                        />
                                    </td>
                                    <td><Button color="danger" onClick={() => this.handleModificarOrden(item.id)}>Eliminar</Button></td>
                                </tr>
                            ))}
                            <tr>
                                <td>MESA:</td>
                                <td colSpan="2">
                                    <Input
                                        type="text"
                                        value={nuevaMesa}
                                        name="nuevaMesa"
                                        onChange={(event) => this.setState({ nuevaMesa: event.target.value })}
                                        placeholder={`Mesa actual: ${selectedMesa}`}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.handleModificarOrden(false)}>Modificar Orden</Button>
                    <Button color="danger" onClick={() => toggleModalTablaMod(false)}>Cerrar</Button>
                </ModalFooter>
            </Modal>
        );
    }
}

export default ModalTablaModificar;
