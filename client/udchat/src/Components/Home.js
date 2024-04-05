import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import './Home.css'; // Importing the CSS file
import logoImage from '../Images/logo_noName.png'; // Importing the logo image
import Layout from './Layout';
import EventCalendar from './EventCalendar';
import CustomPdfViewer from './CustomPdfViewer';
import styles from './Newsletter.module.css';
import './EventCalendar.css'; // import calendar styling sheet
import axios from 'axios'; // Import axios for making HTTP requests

function Home() {
  
    

   
    // ----------------------------------------SIDEBAR FUNCTIONALITY--------------------------------------
  
    const [isSidebarOpen, setSidebarOpen] = useState(false);
  
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };
  
    // ----------------------------------------NEWS AND ANNOUNCEMENTS------------------------------------
  
  
  

  const [viewPdf, setViewPdf] = useState(null);


  // Function to fetch the latest AdminNews PDF from the backend
  const fetchLatestAdminNews = async () => {
    try {
        // Assuming there's an endpoint to get the latest AdminNews PDF
        const response = await axios.get('/api/pdfWaivers/latestAdminNews', { responseType: 'blob' });
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setViewPdf(pdfUrl);
    } catch (error) {
        console.error('Failed to fetch latest AdminNews PDF:', error);
    }
};

  // Fetch the PDF URL from localStorage when the component mounts
  useEffect(() => {
    fetchLatestAdminNews();
    
    
    
    
  }, []);





  
    // ----------------------------------------AUTHENTICATER/LOGIN/--------------------------------------
  
  
  
    
  
    // *********************************************************
  
    // NEED TO ADD MODULAR LAYOUT ANCHORS TO HOME PAGE. ALL OTHER PAGES HAVE IT ALREADY
  
    // *********************************************************
  
    return (
      <Layout>
        <div className="home-page-container">
        <div className="section-title">About Us</div>
        <div className="section-content">Welcome to Uptown! Join our interactive and intuitive server, where you have the ability to chat with friends, check news updates, keep up-to-date with events and way more!</div>
        <div className="donations-title">Donations</div>
        <div className='donations'> <p>Donate Here:<a href="https://www.canadahelps.org/en/pages/olli-cheer/">https://www.canadahelps.org/en/pages/olli-cheer/</a></p></div>
        <div className="section-title">Contact Us!</div>
        <p>Email Us At: <a href="mailto:: ongoinglivinglearning@gmail.com">ongoinglivinglearning@gmail.com</a></p>
        <p>Our Address: 8685 Rockglen Rd. Arkona ON, N0M 1B0</p>
        <p><a href="https://www.facebook.com/cheer.2023?mibextid=PzaGJu">Cheer Group Facebook</a></p>
        <p><a href="https://www.facebook.com/familyconnectionscheer?mibextid=ZbWKwL">Cheer Connections Facebook</a></p>
        <p><a href="https://www.facebook.com/people/Roxys-Mini-Golf-and-Cheer-Canteen/100057044577232/?mibextid=ZbWKwL">Cheer Works Facebook</a></p>

        
        <div className="section-title">Newsletter</div>
                <div className={viewPdf ? styles.newsletterPane : `${styles.newsletterPane} ${styles.rectangle}`}>
                    {viewPdf ? (
                        <CustomPdfViewer fileUrl={viewPdf} />
                    ) : "Newsletter not available"}
                </div> 
      
        
        
        
        


        <div className="section-title">Calendar</div>
        <div className="calendarContainer">
          <EventCalendar>
          </EventCalendar>
        </div>

        <div className="section-title">Updates</div>
        <div className="section-content">
          Jannice is hosting a Pot luck!
        </div>
      </div>
        </Layout>
      );
      
    }
        
  
  export default Home;
  

