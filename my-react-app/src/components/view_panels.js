import React from 'react';
import { Button } from 'reactstrap';
import OrdenPedido from './orden_pedido'

class ViewPanels extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePanel: 1,
        };
    }

    handlePanelClick = (panelNumber) => {
        this.setState({ activePanel: panelNumber });
    };

    render() {
        const { activePanel } = this.state;

        return (

            <div className="container_panels">
                <div className="panel-buttons">
                    <Button
                        color={activePanel === 1 ? 'primary' : 'secondary'}
                        onClick={() => this.handlePanelClick(1)}
                    >
                        Panel 1
                    </Button>
                    <Button
                        color={activePanel === 2 ? 'primary' : 'secondary'}
                        onClick={() => this.handlePanelClick(2)}
                    >
                        Panel 2
                    </Button>
                    <Button
                        color={activePanel === 3 ? 'primary' : 'secondary'}
                        onClick={() => this.handlePanelClick(3)}
                    >
                        Panel 3
                    </Button>
                </div>
                <div className={`panel ${activePanel === 1 ? 'active' : ''}`} id="panel1">
                    <OrdenPedido />
                </div>
                <div className={`panel ${activePanel === 2 ? 'active' : ''}`} id="panel2">
                    Contenido del segundo panel
                </div>
                <div className={`panel ${activePanel === 3 ? 'active' : ''}`} id="panel3">
                    Contenido del tercer panel
                </div>

            </div>

        );
    }
}

export default ViewPanels;
