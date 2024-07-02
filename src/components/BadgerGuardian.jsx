import { useContext } from "react";
import BidContext from "../contexts/BidContext";

export default function BadgerGuardian(props) { 
    const bid = useContext(BidContext)
    if (bid) {
        return props.children
    } else {
        return <p>Please enter a valid Badger ID to continue...</p>
    }
}