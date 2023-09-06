import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import ModalTabla from './ModalTabla';
import TablaModificar from './TablaModificar';
import swal from 'sweetalert';
import axios from 'axios';

const OrdenesCons = () =>  {
    const [showTable, setShowTable] = useState(false);
    const [showTableMod, setShowTableMod] = useState(false);
    const [selectedItems, setSelectedItems] = useState({});
    const [selectedMesa, setSelectedMesa] = useState('');
    const [consecutivo, setConsecutivo] = useState('');
    const [orden_id, setorden_id] = useState('');
    const [Ordenes, setOrdenes] = useState([]);

    const handleTabla = (items,mesa) => {
        setShowTable(true);
        setSelectedItems(Object.assign({}, items));
        setSelectedMesa(mesa)
    };
    const handleTablaModificar = (items,mesa,consecutivo,orden_id) => {
        setShowTableMod(true);
        setSelectedItems(Object.assign({}, items));
        setSelectedMesa(mesa)
        setConsecutivo(consecutivo)
        setorden_id(orden_id)
    };
    const delete_table = async(orden_id) => {
        console.log('Llegamos aqui ',orden_id);
        try {
            await axios.delete(`http://localhost:8000/orden-api/ordenes-delete/${orden_id}/`);
            fetchData('http://localhost:8000/orden-api/ordenes/')
        } catch (error) {
            console.error('Error al modificar la orden:', error);
        }
    };

    const toggleModalTabla = (items) => {
        setShowTable((prevShowTable) => !prevShowTable);
    };
    const fetchData = async (url) => {
        try {
            const response = await axios.get(url);
            setOrdenes(response.data)
        } catch (error) {
            console.error('Error al consultar los datos', error);
        }
    };

    const toggleModalTablaMod = (items) => {
        setShowTableMod((prevShowTable) => !prevShowTable);
        fetchData('http://localhost:8000/orden-api/ordenes/')
        console.log('Se ejecuta esto al cerrarrr ');
    };
    
    useEffect(() => {
        fetchData('http://localhost:8000/orden-api/ordenes/');
    }, []);
    
    return (
        <div className="d-flex flex-wrap justify-content-left" style={{ marginLeft: '4vh'}}>
        {/* <div className="d-flex flex-wrap" style={{ marginLeft: '4vh' }}> */}
            {Ordenes.map(orden => (
                <Card key={orden.id} className="m-2 rounded" style={{ width: '350px' }}>
                    <CardBody>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',marginTop:'-15px' }}>
                            <CardTitle tag="h6" style={{ fontSize: '20px',marginTop: '16px' }}>Nº Orden: {orden.consecutivo}</CardTitle>
                            <div style={{ fontSize: '20px', marginLeft: 'auto',marginTop: '6px' }}>Entregado</div>
                        </div>
                        <CardText className="small" style={{ fontSize: '20px',marginTop:'20px' }}>Cod usuario: 1111</CardText>
                        <CardText className="small" style={{ fontSize: '20px' }}>Fecha: {orden.fecha}</CardText>
                        <CardText className="small" style={{ fontSize: '20px' }}>Mesa: {orden.mesa}</CardText>
                        {/* <h6 className="mt-3">Items:</h6>
                        <ul style={{ fontSize: '18px' }}>
                            {orden.items.map(item => (
                                <li key={item.id} className="small">
                                    <strong>{item.descripcion}</strong> - Categoría: {item.categoria} - Precio: {item.precio}
                                </li>
                            ))}
                        </ul> */}
                    </CardBody>
                    <div className="d-flex justify-content-center" style={{ marginTop: "auto", marginBottom: "5px"}}>
                        <Button color="primary" className="mr-2" onClick={() => handleTabla(orden.items,orden.mesa)}>Ver</Button>
                        <Button color="info" className="mr-2" onClick={() => handleTablaModificar(orden.items,orden.mesa,orden.consecutivo,orden.orden_id)}>Modificar</Button>
                        <Button color="danger" className="mr-2"onClick={() => delete_table(orden.orden_id)}>Eliminar</Button>
                        <Button color="success">Entregar</Button>
                    </div>
                </Card>
            ))}
            <ModalTabla
                selectedItems={selectedItems}
                isOpen={showTable}
                toggleModalTabla={toggleModalTabla}
                selectedMesa={selectedMesa}
                show_buttom={false}
            />
            <TablaModificar 
                isOpen={showTableMod}
                toggleModalTablaMod={toggleModalTablaMod}
                selectedMesa={selectedMesa}
                selectedItems={selectedItems}
                consecutivo={consecutivo}
                orden_id={orden_id}
            />
            
        </div>
    );
    
}

export default OrdenesCons;