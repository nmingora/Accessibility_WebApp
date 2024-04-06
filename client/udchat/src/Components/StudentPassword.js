/* eslint-disable jsx-a11y/img-redundant-alt */

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

// StudentPassword.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';

const BASE_URL = process.env.REACT_APP_BACKEND_URL;  // Importing from the src directory

// Import other necessary modules and components

const StudentLogin = () => {
    const { childId } = useParams(); // Get childId from URL
    console.log("Child ID:", childId);
    const [child, setChild] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const navigateToStudentPortal = () => {
        if (child && child.fName) {
            console.log("Navigating with child's name:", child.fName);
            navigate('/StudentPortal', { state: { studentName: child.fName } });
        } else {
            console.error("Child data not loaded. Cannot navigate.");
        }
    };

    useEffect(() => {
        const fetchChild = async () => {
            const response = await fetch(`${BASE_URL}/api/uptown/child/${childId}`);
            if (response.ok) {
                const data = await response.json();
                setChild(data);
                console.log("Fetched child data:", data);
            } else {
                // Handle errors here
                console.error('Failed to fetch child data');
            }
        };

        fetchChild();
    }, [childId]);

    const handleImageSelect = (imageID) => {
        // Toggle image selection
        setSelectedImages((prevSelectedImages) => {
            if (prevSelectedImages.includes(imageID)) {
                return prevSelectedImages.filter((id) => id !== imageID);
            } else {
                return [...prevSelectedImages, imageID];
            }
        });
    };

    const handleSubmit = async () => {
        try {
            // Ensure child data is loaded
            if (!child) {
                setError('Child data is not loaded.');
                return;
            }
    
            // Assuming 'child' state holds the fetched child data
            const isMatch = JSON.stringify(selectedImages.sort()) === JSON.stringify(child.specialPassword.split(',').map(Number).sort());
    
            if (isMatch) {
                console.log('Authentication successful!');
                navigateToStudentPortal();
            } else {
                setSelectedImages([]);
                alert('Authentication failed. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
            setSelectedImages([]);
        }
    };
    


    return (
        <Layout>
            <div className="student-login-container">
                <h1>Student Login</h1>
                <h2>-------------</h2>
                <div className="image-grid">
                    {/* Display images and handle click events */}

                    {/* {Array.from({ length: 15 }, (_, index) => (
                    // eslint-disable-next-line jsx-a11y/img-redundant-alt
                    <img
                        key={index}
                        src={`/Components/icons/image${index + 1}.jpeg`} // Adjust path accordingly
                        alt={`image${index + 1}`}
                        className={selectedImages.includes(index + 1) ? 'selected' : ''}
                        onClick={() => handleImageSelect(index + 1)}
                    />
                    ))} */}
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
                <h2>------------</h2>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </Layout>
    );
};

export default StudentLogin;
