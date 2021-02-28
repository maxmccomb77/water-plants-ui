import {Button, Spinner, Row, Col} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import axios from 'axios';
import DataTable from './DataTable';

function App() {

  const [wateringData, setWateringData] = useState([]);
  const [processing, setProcessing] = useState(false);

  const [apiHealth, setAPIHealth] = useState('');

useEffect(() => {
  fetchWateringData();
}, []);


const fetchWateringData = () => {

  const headers = {
    "Access-Control-Allow-Origin": "*"
  }

  axios.get('https://75figsak85.execute-api.us-east-1.amazonaws.com/deploy/getwateringdata', headers)
  .then(response => {
    console.log(response);
    setWateringData(response.data);
  })
  .catch(error => {
      console.error('There was an error getting the wattering data', error);
  });
}


const handleWaterNowButton = () => {

  setProcessing(true);

  const putObj = {
    timestamp: Date.now()
  }

  const headers = {
    "Access-Control-Allow-Origin": "*"
  }

  axios.post('https://75figsak85.execute-api.us-east-1.amazonaws.com/deploy/waternow', putObj, headers)
  .then(response => {
    setTimeout(() => {
      fetchWateringData();
      setProcessing(false);
    }, 1000);
    console.log(response);
  })
  .catch(error => {
      console.error('There was an error with the DB call!', error);
      setProcessing(false);

  });


  axios.get('https://75figsak85.execute-api.us-east-1.amazonaws.com/deploy/waternow', headers)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
      console.error('There was an error with the lambda call!', error);
      setProcessing(false);
  });
  

}

  return (
    <div>
        <div>
          <br/>
          <br/>
          {!(processing) ? (<Button size="lg" block onClick={handleWaterNowButton}>Water Now</Button>) : 
              <Button variant="secondary" size="lg" block disabled>Water Now</Button>
          }
          <br/>
          <br/>
          <br/>
          {!(processing) ? (<DataTable data={wateringData}/>) :   
            <Row className="text-center">
              <Col><Spinner animation="grow" variant="primary" /></Col>
              <Col><Spinner animation="grow" variant="primary" /></Col>
              <Col><Spinner animation="grow" variant="primary" /></Col>
              <Col><Spinner animation="grow" variant="primary" /></Col>
            </Row>
          }
        </div>
    </div>
  );
}

export default App;
