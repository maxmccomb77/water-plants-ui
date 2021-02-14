import {Button, Col, Row, Container, Spinner} from 'react-bootstrap';
import {useState} from 'react';
import axios from 'axios';

function App() {


const handleWaterNowButton = () => {
    axios.get('http://localhost:8080/waterNow')
    .then(response => {
      console.log(response);
    })
    .catch(error => {
        console.error('There was an error!', error);
    });
}






  return (
    <div>
        <div>
          <br/>
          <br/>
          <Button size="lg" block onClick={handleWaterNowButton}>Water Now</Button>
        </div>
    </div>
  );
}

export default App;
