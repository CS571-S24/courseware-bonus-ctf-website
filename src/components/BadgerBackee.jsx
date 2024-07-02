import { useContext, useMemo, useState } from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import ToastsContext from "../contexts/ToastsContext";
import BidContext from "../contexts/BidContext";

export default function BadgerBud(props) {

    const [toasts, addToast] = useContext(ToastsContext);

    const [isHover, setIsHover] = useState([false, false, false])

    const buxOptions = useMemo(() => [5, 10, 25], [])

    const bid = useContext(BidContext)

    const flip = (i) => {
        setIsHover(v => {
            let newV = [...v];
            newV[i] = !v[i];
            return newV;
        })
    }

    const giveBux = (b) => {
        fetch(`https://cs571.org/api/s24/bonus/backings?company=${props.name}&amn=${b}`, {
            method: "POST",
            headers: {
                "X-CS571-ID": bid
            }
        }
        )
            .then(res => props.notifyParent())
        addToast({
            title: "Thank you!",
            body: `You have given ${b} bux to ${props.name}!`,
            variant: "success",
            lifespan: 5
        })
        alert("Thanks for your donation!")
    }

    return <Card style={{ textAlign: "left", marginBottom: "0.5rem", padding: "0.25rem" }}>
        <h3>{props.name}</h3>
        <sub>{props.owner}</sub>
        <br />
        <p>{props.description}</p>
        <p>You have given {props.amountGiven} bux.</p>
        {
            buxOptions.map((b, i) => <Button
                key={b}
                disabled={props.totalRemain < b}
                variant={isHover[i] ? "success" : "primary"}
                style={{ marginBottom: "0.25rem" }}
                onMouseOver={() => flip(i)}
                onMouseLeave={() => flip(i)}
                onClick={() => giveBux(b)}
            >
                Give {b} bux!
            </Button>)
        }
    </Card>
}