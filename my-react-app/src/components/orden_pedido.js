import React, { useState, useEffect } from 'react';
import { Button, Input, Label } from 'reactstrap';
import axios from 'axios';
import CarouselItems from './CarouselItems';
import ModalCantidad from './ModalCantidad';
import ModalTabla from './ModalTabla';

const OrdenPedido = () => {
    const [filter, setFilter] = useState('all');
    const [selectedMesa, setSelectedMesa] = useState('');
    const [text, setText] = useState('');
    const [selectedItems, setSelectedItems] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showTable, setShowTable] = useState(false);
    const [carouselData, setCarouselData] = useState({
        bebidas: [],
        comidas: [],
        cocteles: [],
        cristaleria: [],
    });
    const [searchText, setSearchText] = useState({
        bebidas: '',
        comidas: '',
        cocteles: '',
        cristaleria: '',
    });

    useEffect(() => {
        const fetchData = async (url) => {
            try {
                const response = await axios.get(url);
                const allItems = response.data;
                // Categorize the items into separate arrays
                const categorizedItems = {
                    bebidas: allItems.filter((item) => item.category === 'bebidas'),
                    comidas: allItems.filter((item) => item.category === 'comida'),
                    cocteles: allItems.filter((item) => item.category === 'cocteles'),
                    cristaleria: allItems.filter((item) => item.category === 'cristaleria'),
                };
                setCarouselData(categorizedItems);
            } catch (error) {
                console.error('Error al guardar los datos:', error);
            }
        };

        fetchData('http://localhost:8000/items-api/items/');
    }, []);

    const handleMesaChange = (event) => {
        setSelectedMesa(event.target.value);
    };

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleSearchTextChange = (category, event) => {
        setSearchText((prevState) => ({ ...prevState, [category]: event.target.value }));
    };

    const handleItemSelect = (category, item) => {
        const selectedItemsClone = { ...selectedItems };
        if (selectedItemsClone[item.id]) {
            delete selectedItemsClone[item.id];
        } else {
            setSelectedItem(item);
            setIsModalOpen(true);
            return;
        }
        setSelectedItems(selectedItemsClone);
    };

    const handleTabla = () => {
        setShowTable(true);
    };

    const handleClearSelectedItems = () => {
        setSelectedItems({});
    };

    const handleAddToSelectedItems = (item, quantity) => {
        const selectedItemsClone = { ...selectedItems };
        selectedItemsClone[item.id] = { ...item, quantity };
        setSelectedItems(selectedItemsClone);
    };

    const toggleModal = (modalType) => {
        setIsModalOpen((prevState) => !prevState);
        setSelectedItem(modalType === 'main' ? null : selectedItem);
    };

    const toggleModalTabla = (modalType) => {
        setShowTable((prevShowTable) => !prevShowTable);
        console.log('esto ',modalType);
        if(modalType==='items'){
            handleClearSelectedItems();
        }
    };

    const filterCarouselData = (category) => {
        const categoryData = carouselData[category];
        const categorySearchText = searchText[category].toLowerCase();
        return categoryData.filter((item) => item.title.toLowerCase().includes(categorySearchText));
    };

    return (
        <div>
            <div className="container_orden_pedi">
                <div className="filters_orden_pedi">
                    <Input
                        type="text"
                        value={searchText.bebidas}
                        onChange={(e) => handleSearchTextChange('bebidas', e)}
                        placeholder="Buscar bebidas por título..."
                    />
                </div>
                <div className="select-container_orden_pedi">
                    <div className="d-flex align-items-center">
                        <Label for="exampleSelect" className="mr-2">
                            Mesa#
                        </Label>
                        <Input
                            value={selectedMesa}
                            onChange={handleMesaChange}
                            type="select"
                            name="select"
                            id="exampleSelect">
                            <option></option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Input>
                    </div>
                </div>
            </div>

            <CarouselItems
                carouselData={filterCarouselData('bebidas')}
                selectedItems={selectedItems}
                handleItemSelect={(item) => handleItemSelect('bebidas', item)}
            />

            {/* INICIAAA LOS COCTELESSS */}
            <div className="container_orden_pedi">
                <div className="filters_orden_pedi">
                    <Input
                        type="text"
                        value={searchText.cocteles}
                        onChange={(e) => handleSearchTextChange('cocteles', e)}
                        placeholder="Buscar cocteles por título..."
                    />
                </div>
            </div>
            <CarouselItems
                carouselData={filterCarouselData('cocteles')}
                selectedItems={selectedItems}
                handleItemSelect={(item) => handleItemSelect('cocteles', item)}
            />
            
            {/* TERMINAAA LOS COCTELEEESS */}
            {/* INICIAAAA LA CRISTALERIAAA */}
            <div className="container_orden_pedi">
                <div className="filters_orden_pedi">
                    <Input
                        type="text"
                        value={searchText.cristaleria}
                        onChange={(e) => handleSearchTextChange('cristaleria', e)}
                        placeholder="Buscar cristaleria por título..."
                    />
                </div>
            </div>
            <CarouselItems
                carouselData={filterCarouselData('cristaleria')}
                selectedItems={selectedItems}
                handleItemSelect={(item) => handleItemSelect('cristaleria', item)}
            />
            {/* TERMINA LA CRISTALERIAAAA */}
            {/* INICIAAAA LA COMIDAA */}
            <div className="container_orden_pedi">
                <div className="filters_orden_pedi">
                    <Input
                        type="text"
                        value={searchText.comidas}
                        onChange={(e) => handleSearchTextChange('comidas', e)}
                        placeholder="Buscar comidas por título..."
                    />
                </div>
            </div>
            <CarouselItems
                carouselData={filterCarouselData('comidas')}
                selectedItems={selectedItems}
                handleItemSelect={(item) => handleItemSelect('comidas', item)}
            />
            {/* TERMINA LA COMIDA LA COMIDAA */}

            {selectedItem && (
                <ModalCantidad
                    item={selectedItem}
                    isOpen={isModalOpen}
                    toggleModal={toggleModal}
                    onAddToSelectedItems={handleAddToSelectedItems}
                />
            )}
            <div className="text-center mt-4">
                <Button color="success" size="lg" className="ordenbutton" onClick={handleTabla}>
                Terminar orden
                </Button>
            </div>
            <ModalTabla
                selectedItems={selectedItems}
                isOpen={showTable}
                toggleModalTabla={toggleModalTabla}
                onAddToSelectedItems={handleAddToSelectedItems}
                selectedMesa={selectedMesa}
            />
        </div>
    );
};

export default OrdenPedido;
