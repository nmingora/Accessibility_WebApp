import React, { useState, useRef, } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout'
import './AdminProcessApps.css'
import { BASE_URL } from '../config';  // Importing from the src directory

function AdminProcessApps() {
  const navigate = useNavigate();

  const goAdminHome = () => {
    navigate("/Admin");
  }






  // ----------------------------- DATA RETRIEVAL FUNCTIONALITY -----------------------------------

  // whenn called setApplications(data) will take an array and pass it to the applications variable. NICE!
  const [applications, setApplications] = useState([]);



  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/uptown/admin/applications`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setApplications(data);
      console.log("Raw data:", data)
    } catch (error) {
      alert('there was an error retrieving the applications');
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


  // ------------------------------ SORTING DIRECTION -------------------------------------- * NEED TO COMPLETE******
  const [sortDirection, setSortDirection] = useState('');

  const handleSortingDirChange = (event) => {
    const { value } = event.target;

    if (value === 'ascending') {

    } else if (value === 'descending') {

    }

    //setSortDirection();

  }

  // ------------------------------ ACCEPT APPLICATION --------------------------------------


  const acceptApplication = async (id) => {
    // send request to the back-end to accept application
    // 1. send async request with applicaiton id -> back-end make sql query to return person by their id -> change status to approved with sql -> create user
    // Maybe make a function to setStatus(status) in the index.js?
    // 2. back-end change the status of the application with sql to 'accepted'
    // 3. back-end create new parent user in the same function
    // 4. call back the application data and refresh the applicaitons sheet using the const function from above
    // 4. (continued) aka setApplications (DOES THIS REFRESH THE DATA OR DO I NEED TO REFRESH THE HTML EACH TIME??? HOW TO DO?)

    console.log(id);

    try {
      const response = await fetch(`${BASE_URL}/api/uptown/accept-application`, {
        // Could argue PUT but creating an account is more important than simply updating Application table -> Therefore POST is more appropriate. 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id }),
      });
      // check to see if the response is error-free
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // store the responseData in the async return
      const responseData = await response.json();
      console.log('Success', responseData);

      // refresh the screen (NOT WORKING FOR SOME REASON)
      await fetchData();

    }
    catch (error) {
      alert('There was an error accepting the application');
      console.error(error);
    }

  }

  // ------------------------------ REJECT APPLICATION --------------------------------------
  const rejectApplication = async (id) => {
    console.log("application id accepted by reject function: ", id);

    try {
      const response = await fetch(`${BASE_URL}/api/uptown/reject-application`, {
        // use PUT since this is more of an update rather than a complete replication
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id }),
      });
      // refresh the screen?
      fetchData();

      if (!response.ok) {
        const responseData = await response.json();
        throw new Error(`HTTP error! status: ${responseData}`)
      }

    } catch (error) {
      alert("There was an error rejecting the application - see console for details");
      console.error("There was an error rejecting the application: ", error);
    }
  }




  // Hide the accept button if the status is logged as Accepted already. 
  // not sure how to do this




  //------------------------------ GLOWING BUTTONS --------------------------------------

  // ref to store the timer
  const buttonPressTimer = useRef(null);



  // Function to initiate the button press action and call the accept application function 
  const handleMouseDown = (appID, e) => {
    const button = e.currentTarget;
    button.classList.add("is-pressed"); // Initial press effect
    buttonPressTimer.current = setTimeout(() => {
      // Logic to accept the application
      acceptApplication(appID);
      // Add explosion effect
      button.classList.add("explosion-effect");
      setTimeout(() => {
        button.classList.remove("is-pressed", "explosion-effect"); // Clean up
      }, 500); // Ensure this matches the duration of the explosion animation
    }, 3000); // Duration of the initial fill
  };

  // function to initiate the button press action and call the accept application function
  // Function to initiate the button press action and call the accept application function 
  const handleMouseDownReject = (appID, e) => {
    const button = e.currentTarget;
    button.classList.add("is-pressed"); // Initial press effect
    buttonPressTimer.current = setTimeout(() => {
      // Logic to accept the application
      rejectApplication(appID);
      // Add explosion effect
      button.classList.add("explosion-effect");
      setTimeout(() => {
        button.classList.remove("is-pressed", "explosion-effect"); // Clean up
      }, 500); // Ensure this matches the duration of the explosion animation
    }, 2000); // Duration of the initial fill
  };



  const handleMouseUp = (e) => {
    clearTimeout(buttonPressTimer.current);
    e.currentTarget.classList.remove("is-pressed");
  };




  // test to view the applications being sent to the UI. Kind cool. 
  console.log('Global data: ', applications)

  // --------------------------- UI VIEW AND WEB APP ------------------------------------------

  return (
    <Layout>
      <header>Welcome to the Admin Page</header>
      <div className="adminToolBar">

        <div className="searchTerms">

          <button onClick={fetchData}>SEARCH</button>

          {/* Textbox */}
          <input type="text" placeholder="Enter name for search" ref={searchNameField} />
          <input type='text' placeholder='email' ref={searchEmailField} />
          <input type='text' placeholder="Dependent's Name" ref={searchDependentName} />

        </div>


        <div className="divider"></div>



        <div className="sortTerms">

          {/** Sorting Visibility */}
          <select onChange={handleVisibilityChange} value={visibilityOption} placeholder="Sort Visibility">
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


      </div>



      {/** VIEW THE APPLICATIONS HERE */}
      <div className='applicationView'>
        {applications.map((application) => (
          <div key={application.appID}>
            <p>First Name: {application.fName}</p>
            <p>Last Name: {application.lName}</p>
            <p>Email: {application.email}</p>
            <p>Status: {application.status}</p>
            {application.fileName && (
              <a href={`${BASE_URL}/api/uptown/file/${application.fileName}`} target="_blank" rel="noopener noreferrer" className="downloadLink">Download Form</a>
            )}
            <div className="buttonContainer">
              <button
                className="acceptButton"
                onMouseDown={(e) => handleMouseDown(application.appID, e)}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp} // Cancel on mouse leave    
              >
                Accept
              </button>
              <button
                className="rejectButton"
                onMouseDown={(e) => handleMouseDownReject(application.appID, e)}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp} // Cancel on mouse leave    
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>


    </Layout>

  );
};

export default AdminProcessApps;

