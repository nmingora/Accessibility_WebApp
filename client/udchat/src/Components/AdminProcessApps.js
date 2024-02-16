import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout'
import './AdminProcessApps.css'


function AdminProcessApps() {
    const navigate = useNavigate();
    
    const goToNews = () => {
      navigate("/News");
    }


    // ----------------------------- DISPLAY FUNCTIONALITY -----------------------------------

    const[applications, setApplications] = useState([]);

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3005/api/uptown/admin/applications');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation: ", error);
      }
    }



    // ---------------------------- SEARCHING TERMS ------------------------------------------

    const searchNameField = useRef(null);
    const searchEmailField = useRef(null);
    const searchDependentName = useRef(null);




    // -----------------------------    SORTING VISIBILITY    ----------------------------------


    const [visibilityOption, setVisibilityOption] = useState('');

    // function to handle the change in sorting algorithm
    const handleVisibilityChange = (event) => {
      const { value } = event.target;

      if (value === 'pending') {
        setVisibilityPending();
      } else if (value === 'approved') {
        setVisibilityApproved();
      } else if (value === 'denied') {
        setVisibilityDenied();
      } else if (value === 'all') {
        setVisibilityAll();
      }
      setVisibilityOption();
    }

    const setVisibilityPending = () => {
      // Insert the sorting feature to only display the status selected -> this is called be default when clicked but can also be called when user clicks sort
    }
    const setVisibilityApproved = () => {
      // insert the sorting feature to only display the status selected
    }
    const setVisibilityDenied = () => {
      // insert the sorting featurem to only display the status selected
    }
    const setVisibilityAll = () => {
      // insert the sorting feature to only display the status selected
    }


    // ------------------------------ SORTING BY VALUE ----------------------------------------
    const [sortTerm, setSortTerm] = useState('');

    const handleSortTermChange = (event) => {
      const { value } = event.target;

      if (value === 'name') {

      } else if (value === 'email') {

      } else if (value === 'date') {

      } else if (value === 'dependentName') {

      }
  
      setSortTerm();
    }
    


    // ------------------------------ SORTING DIRECTION --------------------------------------
    const [sortDirection, setSortDirection] = useState('');

    const handleSortingDirChange = (event) => {
      const { value } = event.target;

      if (value === 'ascending') {

      } else if (value === 'descending') {

      }

      setSortDirection();
    
    }


    console.log(applications)

    // --------------------------- UI VIEW AND WEB APP ------------------------------------------

  return (
    <Layout>
      <header>Welcome to the Admin Page</header>
        <div className="adminToolBar">

          {/* Buttons */}
          <button onClick={fetchData}>SEARCH</button>


          {/* Textbox */}
          <input type="text" placeholder="Enter name for search" ref={searchNameField}/>
          <input type='text' placeholder='email' ref={searchEmailField}/>
          <input type='text' placeholder="Dependent's Name" ref={searchDependentName}/>


          {/** Sorting Visibility */}
          <select onChange = {handleVisibilityChange} value={visibilityOption} placeholder="Sort Visibility">
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="denied">Denied</option>
            <option value="all">Any Status</option>
          </select>

      
          {/** Sort by Value */}
          <select onChange={handleSortTermChange} value={sortTerm} placeholder="Sort By">
            <option value='name'>Name</option>
            <option value='email'>Email</option>
            <option value='date'>Date</option>
            <option value='dependentName'>Dependent's Name</option>
          </select>


          {/** Sorting Direction */}
          <select onChange={handleSortingDirChange} value={sortDirection}>
            <option value='ascending'>Ascending</option>
            <option value='descending'>Descending</option>
          </select>
        </div>


        {/** VIEW THE APPLICATIONS HERE */}
        <div className='applicationView'>
          {applications.map((application) => (
            <div key={application.id}>
              <p>First Name: {application.fName}</p>
              <p>Last Name: {application.lName}</p>
              <p>Email: {application.email}</p>  
              <p>Status: {application.status}</p>            
            </div>
          ))}
        </div>
    </Layout>

  );
};

export default AdminProcessApps;

