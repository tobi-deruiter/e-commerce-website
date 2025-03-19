import React, { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import styled from 'styled-components';

const ContainerForToast = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    max-width: 90%;
    padding: 4.5rem 0.5rem;
    z-index: 1000;
`

const ResultToast = (props) => {
    const delay = 3;

    const [show, setShow] = useState(false);

    const handleClose = () => {
        props.onClose();
        props.success && window.location.reload();
    }

    useEffect(() => {
        setShow(props.show);
    }, [props.show])

    return (
        <ContainerForToast>
            <Toast
                onClose={handleClose}
                bg={props.success ? "success" : "danger"}
                show={show}
                delay={delay*1000}
                autohide
            >
                <Toast.Header>
                    <strong className="me-auto">{props.success ? "Success" : "Error"}!</strong>
                    <small>{props.title}</small>
                </Toast.Header>
                <Toast.Body>{props.message} <br /> {props.success && `The page will automatically reload in ${delay}s`}</Toast.Body>
            </Toast>
        </ContainerForToast>
    )
};

export default ResultToast;
