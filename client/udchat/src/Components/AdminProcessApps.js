import React, { useState, useRef, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout'
import './AdminProcessApps.css'
//const BASE_URL = process.env.REACT_APP_BACKEND_URL;  // Importing from the src directory
const BASE_URL = process.env.REACT_APP_BACKEND_URL;

function AdminProcessApps() {
  const navigate = useNavigate();

  const goAdminHome = () => {
    navigate("/Admin");
  }





    // ---------------------------- DATA SEARCHING, SORTING, AND SETTING --------------------------------------

  // whenn called setApplications(data) will take an array and pass it to the applications variable. NICE!
  const [applications, setApplications] = useState([]);

    // when called setTempApps(data), will make a temp list called tempApps
    const[tempApps, setTempApps] = useState([]);

    // Refs for search input fields
    const searchNameField = useRef(null);
    const searchEmailField = useRef(null);
    const searchDependentName = useRef(null);

    // state hooks for sorting and visibility options
    const [visibilityOption, setVisibilityOption] = useState('all');
    const [sortTerm, setSortTerm] = useState('name');
    const [sortDirection, setSortDirection] = useState('ascending');


    // Handler for visibility option change
    const handleVisibilityChange = (event) => {
      setVisibilityOption(event.target.value);
      searchAndSort();
    }

    // handler for sort term option change
    const handleSortTermChange = (event) => {
      setSortTerm(event.target.value);
      searchAndSort();
    }

    // handler for sorting direction option change
    const handleSortingDirChange = (event) => {
      setSortDirection(event.target.value);
      searchAndSort();
    }

    useEffect(() => {
      searchAndSort();
  }, [applications, visibilityOption, sortTerm, sortDirection]);





    // ---------------- DISPLAY DATA PROCESSING [SORT AND SEARCH VISIBILITY] --------------------------

    const searchAndSort = () => {
      // First, filter applications based on name and email search criteria
      let filteredApps = applications.filter(app => {
        const nameMatch = searchNameField.current.value ?
            app.fName.toLowerCase().includes(searchNameField.current.value.toLowerCase()) : true;
        const emailMatch = searchEmailField.current.value ?
            app.email.toLowerCase().includes(searchEmailField.current.value.toLowerCase()) : true;
    
        return nameMatch && emailMatch;
      });
    
      // Then, further filter by visibility if not set to 'all'
      if (visibilityOption !== 'all') {
        filteredApps = filteredApps.filter(app => app.status.toLowerCase() === visibilityOption.toLowerCase());
      }
    
      // Sort the filtered list
      filteredApps.sort((a, b) => {
        let compareA = a[sortTermMapping[sortTerm]], compareB = b[sortTermMapping[sortTerm]];
        if (sortTerm === 'date') {
            compareA = new Date(a.DOB);
            compareB = new Date(b.DOB);
        } else {
            compareA = (compareA || "").toString().toLowerCase();
            compareB = (compareB || "").toString().toLowerCase();
        }
        // Adjust sorting logic to account for ascending/descending
        const sortMultiplier = sortDirection === 'ascending' ? 1 : -1;
        return (compareA > compareB ? 1 : compareA < compareB ? -1 : 0) * sortMultiplier;
      });
    
      // Finally, update the state to reflect the sorted and filtered applications
      setTempApps(filteredApps);
    };
    
    
    // Mapping from dropdown value to actual data fields
    const sortTermMapping = {
      'name': 'fName', // Will sort by first name for name sorting. This is easier honestly. 
      'email': 'email',
      'date': 'DOB', // Mapping "date" to "DOB"
    };
    


    
    // ----------------------------- DATA RETRIEVAL FUNCTIONALITY --------------------------------------------

  const fetchData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/uptown/admin/applications`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setApplications(data);
        setTempApps(data);
      console.log("Raw data:", data)
    } catch (error) {
      alert('there was an error retrieving the applications');
      console.error("There was a problem with the fetch operation: ", error);
    }

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




    //------------------------------ GLOWING BUTTONS ---------------------------------------------------------------

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


  const downloadForm = async (tempApp) => {
    if (tempApp.fileName) {
      // Construct the file URL
      const url = `${BASE_URL}/api/uptown/file/${tempApp.fileName}`;
      
      // Open the URL in a new tab
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };
  






    // test to view the applications being sent to the UI. Kind cool. 
    console.log('Global master data: ', applications);
    console.log('Global temp data', tempApps);

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
            <select onChange = {handleVisibilityChange} value={visibilityOption} placeholder="Sort Visibility">
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="all">Any Status</option>
            </select>
        
            {/** Sort by Value */}
            <select onChange={handleSortTermChange} value={sortTerm} placeholder="Sort By">
              <option value='name'>Name</option>
              <option value='email'>Email</option>
              <option value='date'>Date</option>
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
        {tempApps.map((tempApp) => (
          <div key={tempApp.appID}>
            <p>First Name: {tempApp.fName}</p>
            <p>Last Name: {tempApp.lName}</p>
            <p>Email: {tempApp.email}</p>  
            <p>Status: {tempApp.status}</p> 
            
            <div className="buttonContainer">
              {tempApp.fileName && (
                <button
                className="downloadFormButton"
                onClick={() => downloadForm(tempApp)}
              >
                Download Form
              </button>
              )}
              {!(tempApp.fileName) && (
                <button
                  onClick={() => alert("No Form Available to Download")}
                >
                  X -- EMPTY -- X
                </button>
              )}
              <button
                className="acceptButton"
                onMouseDown={(e) => handleMouseDown(tempApp.appID, e)}  
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp} // Cancel on mouse leave    
              >
                Accept
              </button>
              <button
                className="rejectButton"
                onMouseDown={(e) => handleMouseDownReject(tempApp.appID, e)}  
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

