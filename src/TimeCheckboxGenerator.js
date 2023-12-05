import { Stack } from "@mui/material";
import { useEffect, useState } from "react";

const  TimeCheckboxGenerator = ({ selectedTimeZone ,apiDate}) => {
  const [apiData,setAPiData] = useState([])
  const [id,setId] = useState([]);
  const [checkBoxData,setCheckBoxData] = useState({
    checkDatas : false,         
  })

  useEffect(()=>{
  // fetch('http://localhost:3005/home')
  // .then((data)=>{
  // return data.json();
  // }).then((aDAta)=>{
  //   setAPiData(aDAta)
  // })
  },[checkBoxData,id])


  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const currentYear = new Date().getFullYear();
    const year = dateObj.getFullYear() === currentYear ? dateObj.getFullYear().toString().substr(-2) : dateObj.getFullYear();
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObj.getDate().toString().padStart(2, '0');
    return `${month}-${day}-${year}`;
};

const formattedApiDate = formatDate(apiDate);
console.log(formattedApiDate); 



const handleSubmit = async (event,formattedTime,formattedApiDate) => {
  setId(id + 1)
  const { name, checked } = event.target;
  setCheckBoxData(()=>({
      ...checkBoxData,
      [name]: checked,
    

  }));

  
  try {
      const response = await fetch('http://localhost:3005', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Id:id.push(+1),
            checkData:checkBoxData?.checkDatas,
            time:formattedTime,
            date:formattedApiDate

      
        }),
      });

      if (response.ok) {
          console.log('Checkbox data saved successfully!');
      } else {
          console.error('Failed to save checkbox data');
      }
  } catch (error) {
      console.error('Error:', error);
  }
};

  const generateTimeIntervals = (timeZone) => {
    const checkboxes = [];
    let currentTime = new Date();
    currentTime.setHours(8, 0, 0, 0);

    const timeZoneOptions = {
      timeZone,
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    };

    const formatter = new Intl.DateTimeFormat('en-US', timeZoneOptions);

    while (
      currentTime.getHours() < 23 ||
      (currentTime.getHours() === 23 && currentTime.getMinutes() === 0)
    ) {
      const formattedTime = formatter.format(currentTime);
      const getValueCheck = ()=>{
      return  apiData.filter((el,i)=>{
          return formattedTime.toString() === el.time && formattedApiDate.toString() === el.date
        })
      }
      console.log(getValueCheck()[0]?.checkData,"dsagfadsg")

      checkboxes.push(
        <div  key={formattedTime} >
          <input type="checkbox"  name="checkDatas"  checked={(getValueCheck()[0]?.checkData)} onChange={(e)=>handleSubmit(e,formattedTime,formattedApiDate)} id={formattedTime} />
          <label htmlFor={formattedTime}>{formattedTime}</label>
          <br />
        </div>
      );
      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }
    return checkboxes;
  };

  function getCurrentDate() {
    const currentDate = new Date();
    // const year = currentDate.getFullYear().toString().slice(-2); 
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); 
    const day = currentDate.getDate().toString().padStart(2, '0');

    return `${month}-${day}`;
}

const date = getCurrentDate();
console.log(date); 


  return (
    <Stack  direction="row" spacing={2} >
      {formattedApiDate < date ? "past" : generateTimeIntervals(selectedTimeZone)}
    </Stack>
  );
}

export default TimeCheckboxGenerator;