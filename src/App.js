import React, { useState } from 'react';
import { projects, personalDetails } from './staticDB';
import './App.css';

const App = () => {
    const [selectedWhat, setSelectedWhat] = useState(null);

    const groupedData = projects.reduce((acc, item) => {
        if (!acc[item.date]) {
            acc[item.date] = []; // Initialize an empty array for a new year
        }
        acc[item.date].push(item); // Add the project to the array for the corresponding year
        return acc;
    }, {}); // Start with an empty object

    const handleButtonClick = (what) => {
        setSelectedWhat(selectedWhat === what ? null : what);
    };

    return (
        <div className="container">

            <div className="left-section">
                <div className="project-count-wrapper">
                    <div className="project-count">{projects.length}</div>
                </div>

                <div className="year-list-container">
                    {Object.keys(groupedData)
                        .sort((a, b) => b - a)
                        .map((year) => (
                            <div key={year} className="year-list">
                                <div className="year">
                                    {year}
                                </div>
                                <div className="button-container">
                                    {groupedData[year].map((item) => (
                                        <div key={item.What}>
                                            <button
                                                className={`button ${selectedWhat === item.What ? "active" : ""}`}
                                                onClick={() => handleButtonClick(item.What)}
                                            >
                                                {item.What}
                                            </button>
                                            <div className={`details ${selectedWhat === item.What ? "expand" : ""}`}>
                                                {Object.entries(item).map(([key, value]) => (
                                                    key !== "What" && key !== "date" && (
                                                        <div className="key-value-row" key={key}>
                                                            <div className="key">{key}</div>
                                                            <div className="value">
                                                                {Array.isArray(value) ? value.join(", ") : value}
                                                            </div>
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                </div>
            </div >



            <div className="right-section">
                <div className="right-cv-part scrollable">
                    {Object.entries(personalDetails).map(([key, values]) => (
                        <div className="cv-key-value-row" key={key}>
                            <div className="cv-key">{key}</div>
                            <div
                                className={`value ${key === 'OS' ||
                                    key === 'IDE' ||
                                    key === 'Conception' ||
                                    key === 'LCM' ||
                                    key === 'Virtualization' ||
                                    key === 'VersionControl' ||
                                    key === 'Coding' ||
                                    key === 'Links' ||
                                    key === 'Contact' ||
                                    key === 'Automation' ||
                                    key === 'Languages'
                                    ? 'horizontal' : 'vertical'
                                    }`}
                            >
                                {Array.isArray(values) ? (
                                    values
                                        .filter(value => value)
                                        .map((value, index) => (
                                            <div className="cv-value" key={index}>
                                                {value}
                                            </div>
                                        ))
                                ) : (
                                    <div className="cv-value">{values}</div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="right-name-part">
                    <div className="name-text">Manuel <br />Franzini</div>
                </div>
            </div>
        </div>
    );
};

export default App;