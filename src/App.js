import React, { useState } from 'react';
//import ReactDOM from 'react-dom/client';
import data from './staticDB';
import PropTypes from 'prop-types';
import './App.css';


const Popup = ({ dataToShow, onClose }) => {

    if (!dataToShow) return null;

    return (
        <div className="popup">
            <div className="popup-content">
                {Object.entries(dataToShow).map(([key, value]) => (
                    <li className="list-point" key={key}>
                        <div ><strong>{key} <br /> </strong> {Array.isArray(value) ? value.join(', ') : value}</div>
                    </li>
                ))}
                <button
                    className="close-popup"
                    aria-label="Close popup"
                    onClick={onClose}
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

Popup.propTypes = {
    dataToShow: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};


const App = () => {
    const [selectedData, setSelectedData] = useState(null);
    const [showButtons, setShowButtons] = useState(true);

    const handleButtonClick = (index) => {
        setSelectedData(data[index]);
        setShowButtons(false);
    };

    const handleClosePopup = () => {
        setSelectedData(null);
        setShowButtons(true);
    };

    return (
        <div>
            {showButtons && (
                <div>
                    {data.map((item, index) => (
                        <button className="button" key={item.ID} onClick={() => handleButtonClick(index)}>
                            {item.What}
                        </button>
                    ))}
                </div>
            )}
            {!showButtons && (
                <Popup dataToShow={selectedData} onClose={handleClosePopup} />
            )}
            <div className="background-text">Manuel Franzini</div>
        </div>
    );
};

export default App;