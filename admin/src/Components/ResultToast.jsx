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
`

const ResultToast = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        props.onClose();
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
                delay={2000}
                autohide
            >
                <Toast.Header>
                    <strong className="me-auto">{props.success ? "Success" : "Error"}!</strong>
                    <small>{props.title}</small>
                </Toast.Header>
                <Toast.Body>{props.message}</Toast.Body>
            </Toast>
        </ContainerForToast>
    )
};

export default ResultToast;
