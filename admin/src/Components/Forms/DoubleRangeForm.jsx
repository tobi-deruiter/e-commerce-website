import React, { useEffect, useRef, useState } from "react"
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import styled from "styled-components";
import { useIsVisible } from "../../Hooks/useIsVisible";
import { useContainerWidth } from "../../Hooks/useContainerWidth";

const DoubleRangeContainer = styled.div`
    position: relative;
    display: flex;
    margin-bottom: 1rem;
    justify-content: center;
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

const ValueCol = styled(Col)`
    max-width: 100px !important;
`

const ValueForm = styled(Form.Control)`
    text-align: center;
`

const DoubleRangeForm = (props) => {
    const thumbSize = 16;
    const widthOffset = 50;
    const [avg, setAvg] = useState((props.min + props.max) / 2);
    const [minVal, setMinVal] = useState(props.min);
    const [maxVal, setMaxVal] = useState(props.max);
    const containerRef = useRef(null);
    const isVisible = useIsVisible(containerRef);
    const width = useContainerWidth(containerRef, [isVisible]);

    const minWidth = thumbSize + ((avg - props.min) / (props.max - props.min)) * ((width - widthOffset) - 2 * thumbSize);
    const styles = {
        min: {
            width: minWidth,
            left: (widthOffset / 2)
        },
        max: {
            width: thumbSize + ((props.max - avg) / (props.max - props.min)) * ((width - widthOffset) - 2 * thumbSize),
            left: minWidth + (widthOffset / 2)
        }
    };

    const handleMinValChange = (e) => {
        try {
            setMinVal(Number(e.target.value))
        } catch (err) {}
    }

    const handleMaxValChange = (e) => {
        try {
            setMaxVal(Number(e.target.value))
        } catch (err) {}
    }

    useEffect(() => {
        setAvg(Number(((maxVal + minVal) / 2).toFixed(0)));
        props.onRangeChange(minVal, maxVal);
    }, [minVal, maxVal]);

    useEffect(() => {
        setMaxVal(props.max);
    }, [props.max])

    return (
        <div>
            <Row>
                <ValueCol>
                    <ValueForm
                        type="text"
                        value={minVal}
                        onChange={handleMinValChange}
                    />
                </ValueCol>
                <Col></Col>
                <ValueCol>
                    <ValueForm
                        type="text"
                        value={maxVal}
                        onChange={handleMaxValChange}
                    />
                </ValueCol>
            </Row>
            <Row>
                <DoubleRangeContainer ref={containerRef}>
                    <MinRange
                        type="range"
                        name="min"
                        min={props.min}
                        max={avg}
                        value={minVal}
                        step={props.step ? props.step : 1}
                        style={styles.min}
                        onChange={handleMinValChange}
                    />
                    <MaxRange
                        type="range"
                        name="max"
                        min={avg}
                        max={props.max}
                        value={maxVal}
                        step={props.step ? props.step : 1}
                        style={styles.max}
                        onChange={handleMaxValChange}
                    />
                </DoubleRangeContainer>
            </Row>
        </div>
    )
};

export default DoubleRangeForm;
