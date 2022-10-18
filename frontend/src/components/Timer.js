import {
  useState,
  useEffect
} from 'react';
import {
  Typography
} from "@mui/material";
import {
  Card
} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Timer({maxRange}) {
  const [counter, setCounter] = useState(maxRange);

  useEffect(() => {
    if (counter > 0) {
      setTimeout(() => setCounter(counter - 1), 1000);
    }
  }, [counter])

  return (
    <div style={{ paddingBottom: 30}}>
      <Card class="text-center" style={{ width: '10rem'}}>
        <Card.Body>
          <Typography style={{ fontWeight: 600, fontSize: 20, display: 'flex', justifyContent: 'center'}} color="#424242">
            {counter}s
          </Typography>
        </Card.Body>
      </Card>
    </div>
  );
}

