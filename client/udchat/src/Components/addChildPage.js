/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import Layout from './Layout'
import './addChild.css';
//import the images
import image1 from '../Components/icons/image1.jpeg';
import image2 from '../Components/icons/image2.jpeg';
import image3 from '../Components/icons/image3.jpeg';
import image4 from '../Components/icons/image4.jpeg';
import image5 from '../Components/icons/image17.jpeg';
import image6 from '../Components/icons/image6.jpeg';
import image7 from '../Components/icons/image7.jpeg';
import image8 from '../Components/icons/image16.jpeg';
import image9 from '../Components/icons/image9.jpeg';
import image10 from '../Components/icons/image10.jpeg';
import image11 from '../Components/icons/image11.jpeg';
import image12 from '../Components/icons/image12.jpeg';
import image13 from '../Components/icons/image13.jpeg';
import image14 from '../Components/icons/image14.jpeg';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;  // Importing from the src directory

const AddChildForm = () => {
    const [username, setUsername] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [fName, setChildFirstName] = useState('');
    const [lName, setChildLastName] = useState('');
    const [DOB, setChildDOB] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleChildFirstNameChange = (e) => {
        setChildFirstName(e.target.value);
    };

    const handleChildLastNameChange = (e) => {
        setChildLastName(e.target.value);
    };

    const handleChildDOBChange = (e) => {
        setChildDOB(e.target.value);
    };

    const handleImageSelect = (imageID) => {
        setSelectedImages((prevSelectedImages) => {
            if (prevSelectedImages.includes(imageID)) {
                return prevSelectedImages.filter((id) => id !== imageID);
            } else {
                return [...prevSelectedImages, imageID];
            }
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const childInfo = {
            specialPassword: selectedImages,
            fName: fName,
            lName: lName,
            DOB: DOB,
        };
        const childInfoWithPassword = {
            ...childInfo,
            specialPassword: selectedImages,
        };
        try {
            const response = await fetch(`${BASE_URL}/api/uptown/addChild`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, childInfo: childInfoWithPassword }),
            });

            if (response.ok) {
                const responseData = await response.json();
                alert('Child added successfully: ' + responseData.message);
                // Reset the fields here
                setUsername('');
                setSelectedImages([]);
                setChildFirstName('');
                setChildLastName('');
                setChildDOB('');
            } else {
                const errorData = await response.json();
                alert('Error adding child: ' + errorData.message);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('An error occurred while trying to add the child.');
        }
    };

    return (
        <Layout>
            <div className="add-child-container">
                <h2>Add Your Child</h2>
                <form onSubmit={handleSubmit} className="add-child-form">
                    <div className="form-section">
                        <input type="text" value={username} onChange={handleUsernameChange} placeholder="Parent Username" required />
                        <input type="text" value={fName} onChange={handleChildFirstNameChange} placeholder="Child's First Name" required />
                        <input type="text" value={lName} onChange={handleChildLastNameChange} placeholder="Child's Last Name" required />
                        <input type="date" value={DOB} onChange={handleChildDOBChange} placeholder="Child's Date of Birth" required />
                    </div>
                    <div className="image-selection">
                        <h3>Choose 3 Images as Special Password</h3>
                        <div className="image-grid">
                            <img
                                src={image1}
                                alt="Image 1"
                                className={selectedImages.includes(1) ? 'selected' : ''}
                                onClick={() => handleImageSelect(1)}
                            />
                            <img
                                src={image2}
                                alt="Image 2"
                                className={selectedImages.includes(2) ? 'selected' : ''}
                                onClick={() => handleImageSelect(2)}
                            />
                            <img
                                src={image3}
                                alt="Image 3"
                                className={selectedImages.includes(3) ? 'selected' : ''}
                                onClick={() => handleImageSelect(3)}
                            />
                            <img
                                src={image4}
                                alt="Image 4"
                                className={selectedImages.includes(4) ? 'selected' : ''}
                                onClick={() => handleImageSelect(4)}
                            />
                            <img
                                src={image5}
                                alt="Image 5"
                                className={selectedImages.includes(17) ? 'selected' : ''}
                                onClick={() => handleImageSelect(17)}
                            />
                            <img
                                src={image6}
                                alt="Image 6"
                                className={selectedImages.includes(6) ? 'selected' : ''}
                                onClick={() => handleImageSelect(6)}
                            />
                            <img
                                src={image7}
                                alt="Image 7"
                                className={selectedImages.includes(7) ? 'selected' : ''}
                                onClick={() => handleImageSelect(7)}
                            />
                            <img
                                src={image8}
                                alt="Image 8"
                                className={selectedImages.includes(16) ? 'selected' : ''}
                                onClick={() => handleImageSelect(16)}
                            />
                            <img
                                src={image9}
                                alt="Image 9"
                                className={selectedImages.includes(9) ? 'selected' : ''}
                                onClick={() => handleImageSelect(9)}
                            />
                            <img
                                src={image10}
                                alt="Image 10"
                                className={selectedImages.includes(10) ? 'selected' : ''}
                                onClick={() => handleImageSelect(10)}
                            />
                            <img
                                src={image11}
                                alt="Image 11"
                                className={selectedImages.includes(11) ? 'selected' : ''}
                                onClick={() => handleImageSelect(11)}
                            />
                            <img
                                src={image12}
                                alt="Image 12"
                                className={selectedImages.includes(12) ? 'selected' : ''}
                                onClick={() => handleImageSelect(12)}
                            />
                            <img
                                src={image13}
                                alt="Image 13"
                                className={selectedImages.includes(13) ? 'selected' : ''}
                                onClick={() => handleImageSelect(13)}
                            />
                            <img
                                src={image14}
                                alt="Image 14"
                                className={selectedImages.includes(14) ? 'selected' : ''}
                                onClick={() => handleImageSelect(14)}
                            />
                        </div>
                    </div>
                    <button type="submit" className="submit-btn">Add Child</button>
                </form>
            </div>
        </Layout>
    );
};

export default AddChildForm;
