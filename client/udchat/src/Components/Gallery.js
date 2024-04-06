import React, { useState, useEffect } from 'react';
import './Gallery.css'; // Make sure the path is correct
import { useNavigate } from 'react-router-dom';
import Layout from './Layout'
const BASE_URL = process.env.REACT_APP_BACKEND_URL;  // Importing from the src directory

const events = [
    { id: 1, name: 'Event 1', date: '2023-04-01', images: ['./EventPics/image1a.jpg', './EventPics/image1b.jpg', './EventPics/image1c.jpg'] },
    { id: 2, name: 'Event 2', date: '2023-04-15', images: ['./EventPics/image1b.jpg', './EventPics/image1b.jpg', './EventPics/image1b.jpg'] },
    // Add more events as needed
  ];

function Gallery() {
  return (
    <Layout>

        <div className="gallery">
            {events.map((event) => (
                <div key={event.id} className="event">
                <div className="event-images">
                    {event.images.map((image, index) => (
                    <img key={index} src={image} alt={`${event.name} - ${index + 1}`} className="event-image"/>
                    ))}
                </div>
                <h2 className="event-name">{event.name}</h2>
                <p className="event-date">{event.date}</p>
                </div>
        ))}
        </div>   

    </Layout>
    
  );
}

export default Gallery;
