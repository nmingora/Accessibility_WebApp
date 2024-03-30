import React, {useState,useEffect} from 'react';
import {Calendar,dateFnsLocalizer} from "react-big-calendar";
import Modal from './Modal';
import EventSignUpWindow from './EventSignUpWindow';
import format from "date-fns/format";
import parseISO from "date-fns/parseISO";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { gapi } from "gapi-script";
import "./EventCalendar.css";


function EventCalendar(){
    const [events,setEvents] = useState([]);
    const [selectedEvent,setSelectedEvent] = useState();
    const [showModal,setShowModal] = useState(false);
    const [calendarID,setCalendarID] = useState("te8173120@gmail.com");
    const [apiKey,setAPIKey] = useState("AIzaSyCWUgthgaEYpsm603nlpmDFavCuPDcI-4I");
    

    const locales = {"en-US":require("date-fns/locale/en-US")}
    const localizer = dateFnsLocalizer({
        format,
        parse:str=>parseISO(str),
        startOfWeek,
        getDay,
        locales
    });

    const getEvents = async () => {
        try{
            const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events?key=${apiKey}`);
            
            if(!response.ok){
                throw new Error("Error retrieving events!")
            }

            let data = await response.json();

            let fetchedEvents = data.items.map(ev=>
                (
                    {
                    id:ev.id,
                    title: ev.summary,
                    start: new Date(ev.start[Object.keys(ev.start)[0]]), 
                    end: new Date(ev.end[Object.keys(ev.end)[0]]), 
                    location: ev.location,
                    desc: ev.description,
                    }
                )
            );
            setEvents(fetchedEvents);
    
        }catch(err){
            console.log(err);
        }
    }
 
    useEffect(() => {
        getEvents();
    }, []);

    const handleSelectedEvent = (event) => {
        console.log("Event selected!")
        setSelectedEvent(event);
        setShowModal(true);
    }

    return <div>
         <Calendar 
            localizer={localizer} 
            events ={events} 
            startAccessor="start" 
            endAccessor="end" 
            style={{minHeight: "600px"}}
            onSelectEvent={(event)=>{handleSelectedEvent(event)}}
            views={['month']}
         />
         <Modal open={showModal} onClose={()=>{setShowModal(false)}}>
                    <EventSignUpWindow event={selectedEvent}></EventSignUpWindow>
        </Modal>
    </div>
}


export default EventCalendar;


