import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import BadgerGuardian from './components/BadgerGuardian';
import BadgerBackersParent from './components/BadgerBackersParent';
import BidContext from './contexts/BidContext'
import { Button, Form } from 'react-bootstrap';
import { useRef, useState } from 'react';

function App() {

  const bidRef = useRef();
  const [confirmedBid, setConfirmedBid] = useState();

  const handleSubmit = async (e) => {
    e?.preventDefault();

    const bid = bidRef.current.value?.trim();

    const resp = await fetch("https://cs571.org/api/auth/verify-bid", {
      credentials: "omit",
      headers: {
        "X-CS571-ID": bid
      }
    })
    if (resp.ok) {
      setConfirmedBid(bid)
    } else {
      alert("That is not a valid Badger ID!")
    }
  }

  return <div style={{ margin: "2rem" }}>
    <header style={{ textAlign: "left", marginTop: "-1rem" }}>
      <h1>Badger Backers</h1>
      {/* <p>Need help finding a secret code? <a target="_blank" href="../../api/s24/bonus/help">Visit here.</a></p> */}
      <sub>This is NOT a "real" website. This is a simulated environment for you to do security testing on. This website is for <em>educational purposes only</em>.</sub>
      {!confirmedBid && <>
        <br />
        <Form onSubmit={handleSubmit} style={{ display: "flex", marginTop: "1rem" }}>
          <Form.Label htmlFor='bid-input' style={{ minWidth: "10rem" }}>Enter Your Badger ID</Form.Label>
          <Form.Control id='bid-input' ref={bidRef} style={{ marginRight: "1rem" }} autoComplete='off'></Form.Control>
          <Button type='submit' onClick={handleSubmit}>Submit</Button>
        </Form>
      </>}
      <hr />
    </header>
    <BidContext.Provider value={confirmedBid}>
      <BadgerGuardian>
        <BadgerBackersParent />
      </BadgerGuardian>
    </BidContext.Provider>

  </div>
}

export default App
