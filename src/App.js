import React, { useState } from 'react';
import { projects, personalDetails } from './staticDB';
import './App.css';

function cleanData(obj) {
    const cleaned = {};
    for (const key in obj) {
        if (Array.isArray(obj[key])) {
            const filteredArray = obj[key].filter(value => value !== "");
            if (filteredArray.length > 0) {
                cleaned[key] = filteredArray;
            }
        } else if (obj[key] !== null && obj[key] !== "") {
            cleaned[key] = obj[key];
        }
    }
    return cleaned;
}

const App = () => {
    const [selectedMenu, setSelectedMenu] = useState('Project'); // Default to "Project"
    const [selectedProject, setSelectedProject] = useState(null); // Track selected project

    const groupedData = projects.reduce((acc, item) => {
        if (!acc[item.date]) {
            acc[item.date] = [];
        }
        acc[item.date].push(item);
        return acc;
    }, {});

    const handleProjectClick = (project) => {
        console.log('Clicked Project:', project); // Log the passed project title
        setSelectedProject(selectedProject === project ? null : project);
    };

    const renderLeftContent = () => {
        if (selectedMenu === 'Project') {
            return (
                <div className="year-list-container">

                    <div className="text-big">big big big big big</div>
                    <div className="text-medium">medium medium medium medium </div>
                    <div className="text-small">small small small small </div>

                    {Object.keys(groupedData)
                        .sort((a, b) => b - a)
                        .map((year) => (
                            <div key={year} className="year-list">
                                <div className="year">{year}</div>
                                <div className="button-container">

                                    {groupedData[year]
                                        .filter((item) => item.Title) // Only include items with a valid "Title"
                                        .map((item) => (
                                            <div key={`${item.date}-${item.Title}`}>
                                                <button
                                                    className={`button ${selectedProject === item.Title ? 'active' : ''}`}
                                                    onClick={() => handleProjectClick(item.Title)}
                                                >
                                                    {item.Title}
                                                </button>
                                                {selectedProject === item.Title && (
                                                    <div className={`details ${selectedProject === item.Title ? 'expand' : ''}`}>
                                                        {Object.entries(cleanData(item))
                                                            .filter(([key, value]) =>
                                                                key !== 'Title' &&
                                                                key !== 'date' &&
                                                                value !== '')
                                                            .map(([key, value]) => (
                                                                <div className="key-value-row" key={key}>
                                                                    <div className="key">{key}</div>
                                                                    <div className="value">
                                                                        {Array.isArray(value) ? value.join(', ') : value}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}

                                </div>
                            </div>
                        ))}
                </div>
            );
        } else if (selectedMenu === 'Contact') {
            return (
                <div className="contact-content">
                    <h3>Contact Details</h3>
                    <p>Email: example@example.com</p>
                    <p>Phone: +41 79 123 45 67</p>
                </div>
            );
        } else if (selectedMenu === 'CV') {
            return (
                <div className="cv-content">
                    {Object.entries(cleanData(personalDetails)).map(([key, values]) => (
                        <div className="cv-key-value-row" key={key}>
                            <div className="cv-key">{key}</div>
                            <div
                                className={`value ${['OS', 'IDE', 'Conception', 'LCM', 'Virtualization', 'VersionControl', 'Coding', 'Links', 'Contact', 'Automation', 'Languages'].includes(key)
                                    ? 'horizontal'
                                    : 'vertical'
                                    }`}
                            >
                                {Array.isArray(values) ? (
                                    values.map((value, index) => (
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
            );
        }
    };

    return (
        <div className="container">
            {/* Left Section */}
            <div className="left-section">{renderLeftContent()}</div>

            {/* Right Section */}
            <div className="right-section">
                <div className="menu-container">
                    <div className="menu">
                        {['Project', 'CV', 'Contact'].map((menu) => (
                            <button
                                key={menu}
                                className={`button ${selectedMenu === menu ? 'active' : ''}`} // Styled like project titles
                                onClick={() => setSelectedMenu(menu)}
                            >
                                {menu}
                            </button>
                        ))}
                    </div>
                </div>


            </div>
            <div className="footer">
                <div className="name-text">
                    Manuel <br />
                    Franzini
                </div>
            </div>
        </div>
    );
};

export default App;

/*

 <div className="right-name-part">
                    <div className="name-text">
                        Manuel <br />
                        Franzini
                    </div>
                </div>
*/
