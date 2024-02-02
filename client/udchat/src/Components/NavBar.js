import './NavBar.css';
import { useState } from 'react';
import {useNavigate} from "react-router-dom";

function NavBar({options}) {
    const [selectedOption,setSelectedOption] = useState(null);


    const handleOptionClick = (index,val) => {
        setSelectedOption(index);
        navigate(val);
    }
    const navigate = useNavigate();

  return (
    <div className="NavBar">
        {Object.entries(options).map(([name,val],index)=>(
            <div 
                key={index} 
                className={`NavOption ${index === selectedOption ? 'selected':''}`} 
                onClick={()=>{handleOptionClick(index,val)}}
            >
                {name}
            </div>
        ))}
    </div>
  );
}



export default NavBar;
