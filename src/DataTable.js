import {Table} from 'react-bootstrap';
import {useState} from 'react';

function DataTable(props) {

    const months =["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

    const getFormattedTimestamp = (tmstmp) =>{
        const date = new Date(parseInt(tmstmp));

        const year = date.getFullYear();
        const month = months[date.getMonth()];
        const day = date.getUTCDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        
        const standardTime = convertToStandardTime(hour + ":" + minute + ":" + second);

        return month + " " + day + " " + year + " " + standardTime;
    }

    const convertToStandardTime = (time) => {
        time = time.split(':'); // convert to array

        // fetch
        var hours = Number(time[0]);
        var minutes = Number(time[1]);
        var seconds = Number(time[2]);

        // calculate
        var timeValue;

        if (hours > 0 && hours <= 12) {
        timeValue= "" + hours;
        } else if (hours > 12) {
        timeValue= "" + (hours - 12);
        } else if (hours == 0) {
        timeValue= "12";
        }
        
        timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
        timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;  // get seconds
        timeValue += (hours >= 12) ? " PM" : " AM";  // get AM/PM

        return timeValue;
    }


  return (
    <Table striped bordered>
        <thead>
            <tr>
                <th>Watering Type</th>
                <th>Timestamp</th>
            </tr>
            {props.data.map(item => 
                <tr>
                    <td>{item.wateringType}</td>
                    {<td>{getFormattedTimestamp(item.wateringTimestamp)}</td>}
                </tr>
            )}
        </thead>
    </Table>
  );
}

export default DataTable;
