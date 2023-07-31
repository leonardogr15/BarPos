import React from 'react';

class CarouselItems extends React.Component {
    render() {
        const { carouselData, selectedItems, handleItemSelect } = this.props;

        return (
            <div className="carousel-container_orden_pedi">
                {carouselData.map((item) => (
                    <div
                        key={item.id}
                        className={`carousel-item_orden_pedi ${selectedItems[item.id] ? 'selected' : ''}`}
                        onClick={() => handleItemSelect(item)}
                    >
                        <h3>{item.title}</h3>
                        <h3>
                            {item.precio.toLocaleString('es-CO', {
                                style: 'currency',
                                currency: 'COP',
                                minimumFractionDigits: 0,
                            })}
                        </h3>
                        {selectedItems[item.id] && <span className="selected-icon">✔</span>}
                    </div>
                ))}
            </div>
        );
    }
}

export default CarouselItems;
