import React, { useEffect, useRef, useState } from "react"
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styled from "styled-components";
import { useIsVisible } from "../../Hooks/useIsVisible";

const DoubleRangeContainer = styled.div`
    position: relative;
    display: flex;
    margin-bottom: 1rem;
`

const MinRange = styled(Form.Range)`
    position: absolute;
    
    &::-webkit-slider-runnable-track {
        border-radius: 1rem 0 0 1rem;
    }
`
const MaxRange = styled(Form.Range)`
    position: absolute;
    
    &::-webkit-slider-runnable-track {
        border-radius: 0 1rem 1rem 0;
    }
`

const LeftValueCol = styled(Col)`
    text-align: right;
`

const RightValueCol = styled(Col)`
    text-align: left;
`

const DoubleRangeForm = (props) => {
    const thumbSize = 16;
    const [avg, setAvg] = useState((props.min + props.max) / 2);
    const [minVal, setMinVal] = useState(props.min);
    const [maxVal, setMaxVal] = useState(props.max);
    const [width, setWidth] = useState(300);
    const containerRef = useRef(null);
    const isVisible = useIsVisible(containerRef);

    const minWidth = thumbSize + ((avg - props.min) / (props.max - props.min)) * (width - 2 * thumbSize);
    const styles = {
        min: {
            width: minWidth,
            left: 0
        },
        max: {
            width: thumbSize + ((props.max - avg) / (props.max - props.min)) * (width - 2 * thumbSize),
            left: minWidth
        }
    };

    useEffect(() => {
        setAvg(Number(((maxVal + minVal) / 2).toFixed(0)));
        props.onRangeChange(minVal, maxVal);
    }, [minVal, maxVal]);

    useEffect(() => {
        setMaxVal(props.max);
    }, [props.max])

    useEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.offsetWidth);
        }

        const handleResize = () => {
            setWidth(containerRef.current.offsetWidth);
        }

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [containerRef, isVisible]);

    return (
        <Row>
            <LeftValueCol xs="1">
                {minVal}
            </LeftValueCol>
            <Col>
                <DoubleRangeContainer ref={containerRef}>
                    <MinRange
                        type="range"
                        name="min"
                        min={props.min}
                        max={avg}
                        value={minVal}
                        step={props.step ? props.step : 1}
                        style={styles.min}
                        onChange={({ target }) => {
                            try {
                                setMinVal(Number(target.value))
                            } catch (err) {}
                        }}
                    />
                    <MaxRange
                        type="range"
                        name="max"
                        min={avg}
                        max={props.max}
                        value={maxVal}
                        step={props.step ? props.step : 1}
                        style={styles.max}
                        onChange={({ target }) => {
                            try {
                                setMaxVal(Number(target.value))
                            } catch (err) {}
                        }}
                    />
                </DoubleRangeContainer>
            </Col>
            <RightValueCol xs="1">
                {maxVal}
            </RightValueCol>
        </Row>
    )
};

export default DoubleRangeForm;
