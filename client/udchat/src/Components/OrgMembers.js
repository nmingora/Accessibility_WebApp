import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import './OrgMembers.css';  // Ensure you have the correct path to your CSS file

const ParentsList = () => {
    const [parents, setParents] = useState([]);

    useEffect(() => {
        const fetchParents = async () => {
            try {
                const response = await fetch('/api/uptown/members');
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setParents(data);
                console.log(data); // Log the data to inspect its structure
            } catch (error) {
                console.error('Error fetching parents:', error);
            }
        };

        fetchParents();
    }, []);

    const formatParentInfo = (parent) => {
        let formattedInfo = '';
        for (const [key, value] of Object.entries(parent)) {
          // Customize the label for each key or skip certain keys
          let label = key.charAt(0).toUpperCase() + key.slice(1); // Capitalize the first letter
          if (key === 'userID') label = 'User ID';
          if (key === 'fName') label = "Parent's First Name";
          if (key === 'lName') label = "Parent's Last Name";
          if (key === 'childrenNames') label = "Children";
      
          // Add the property to the formatted string
          formattedInfo += `${label}: ${value}\n`; // '\n' creates a new line
        }
        return formattedInfo;
      };
      
    return (
        <Layout>
            <div className="parents-list-container">
                <h1>Current Members of Organization</h1>
                <ul className="parents-list">
                    {parents.map((parent) => (
                        <li key={parent.userID} className="parent-item">
                            <span className="parent-name">Parents: {parent.fName} {parent.lName}</span>
                            <span className="children-names">
                                Children: {parent.childrenNames ? parent.childrenNames.split(',').join(', ') : 'No children'}
                            </span>
                            <button className="info-button" onClick={() => alert(`Parent Info:\n${formatParentInfo(parent)}`)}>Show Info</button>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
};

export default ParentsList;
