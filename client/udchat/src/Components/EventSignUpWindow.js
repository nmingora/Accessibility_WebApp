import React,{ useState }  from 'react';

function EventSignUpWindow({event}){
    const [enableRSVP,setEnableRSVP] = useState(false);
    const [calendarID,setCalendarID] = useState(process.env.REACT_APP_CALENDAR_ID);
    const [apiKey,setAPIKey] = useState(process.env.REACT_APP_API_KEY);

    const registerParent = async () => {
        //google API call to add parent to event attendance
        try{
            const newAttendeeEmail = "";

            const url = `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events/${event.id}?key=${apiKey}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            });

            if(response.ok){
                setEnableRSVP(false);
            }
            else{
                alert(`Error signing user up for ${event.title}. Please contact Admin.`)
            }

            const event = await response.json();
            if (event && event.attendees) {
              event.attendees.push({ email: newAttendeeEmail });
            } else {
              event.attendees = [{ email: newAttendeeEmail }];
            }

            const updateResponse = await fetch(url, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(event)
            });
            
            if (!updateResponse.ok) {
                alert("Failed to update event!")
                return;
            }
            else{
                alert("Successfully RSVP'ed event")
            }


        }catch(err){
            console.log(err);
        }
    }

    const formatDates = (date,isStart) => {
        const withoutTimezone = date.toString().split(" ").splice(0,5).join(" ");
        return isStart? withoutTimezone:withoutTimezone.concat(date.toString().substring(date.toString().indexOf("(")));
    }

    return <div>
        <h2 style={{ color: 'black' }}>{event.title}</h2>
        <p>{`Date: ${formatDates(event.start,true)} - ${formatDates(event.end)}`}</p>
        <p>{(event.location)?`Location: ${event.location}`:""}</p>
        <p>{event.desc}</p>
        <div className="eventSignUpBtn">
            <button disabled={enableRSVP} onClick={registerParent}>Register for this Event!</button>
        </div>
    </div>
}


export default EventSignUpWindow;