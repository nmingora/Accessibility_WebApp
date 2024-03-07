import React,{ useState }  from 'react';

function EventSignUpWindow({event}){
    const [enableRSVP,setEnableRSVP] = useState(false);
    const calendarID="te8173120@gmail.com";
    const apiKey = "AIzaSyCWUgthgaEYpsm603nlpmDFavCuPDcI-4I"

    const registerParent = async () => {
        //google API call to add parent to event attendance
        try{
            const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events/${event.id}?key=${apiKey}`,
            {
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify({attendees:[{email:"geoff.easton21@gmail.com"}]})
            });

            if(response.ok){
                setEnableRSVP(false);
            }
            else{
                alert(`Error signing user up for ${event.title}. Please contact Admin.`)
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
        <h2>{event.title}</h2>
        <p>{`Date: ${formatDates(event.start,true)} - ${formatDates(event.end)}`}</p>
        <p>{(event.location)?`Location: ${event.location}`:""}</p>
        <p>{event.desc}</p>
        <div className="eventSignUpBtn">
            <button disabled={enableRSVP} onClick={registerParent}>Register for this Event!</button>
        </div>
    </div>
}


export default EventSignUpWindow;