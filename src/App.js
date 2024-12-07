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
                          className={selectedProject === item.Title ? "button-active" : "button"}
                          onClick={() => handleProjectClick(item.Title)}
                        >
                          {item.Title}
                        </button>
                        {selectedProject === item.Title && (
                          <div className={selectedProject === item.Title ? "details-expand" : "details"}>
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
        <div>
          <h3>Contact Details</h3>
          <p>Email: example@example.com</p>
          <p>Phone: +41 79 123 45 67</p>
        </div>
      );
    } else if (selectedMenu === 'CV') {
      return (
        <div>
          {Object.entries(cleanData(personalDetails)).map(([key, values]) => (
            <div className="cv-key-value-row" key={key}>
              <div className="cv-key">{key}</div>

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
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      <div className="container">
        {/* Left Section */}
        <div className="left-section">{renderLeftContent()}</div>

        {/* Right Section */}
        <div className="right-section">
          <div className="menu-container">
            {['Project', 'CV', 'Contact'].map((menu) => (
              <button
                key={menu}
                className={selectedMenu === menu ? "button-active" : "button"}
                onClick={() => setSelectedMenu(menu)}
              >
                {menu}
              </button>
            ))}
          </div>


        </div>
        <div className="footer">
          <div className="name-text">
            Manuel <br />
            Franzini
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;




/*{
  "name": "myportfolio",
  "version": "0.1.0",
  "homepage": "https://Manuelfranzini.github.io/repository-portfolio",
  "private": true,
  "dependencies": {
    "@fortawesome/fontawesome-svg-core": "^6.4.2",
    "@fortawesome/react-fontawesome": "^0.2.0",
    "@testing-library/jest-dom": "^5.17.0",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-scripts": "^5.0.1",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-app-rewired start",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@babel/plugin-proposal-private-property-in-object": "^7.21.11",
    "gh-pages": "^6.0.0",
    "react-app-rewired": "^2.2.1"
  },
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    "react/prop-types": "off",
    "no-unused-vars": "warn",
    "react/jsx-uses-react": "warn",
    "react/jsx-uses-vars": "warn"
  }
}*/