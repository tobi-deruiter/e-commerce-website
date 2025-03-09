import React, { useEffect, useRef, useState } from "react"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import styled from 'styled-components';
import Item from "./Item";
import API_Client from "../api/apiClient";
import { useContainerWidth } from "../Hooks/useContainerWidth";
import ResultToast from "./ResultToast";
import ProductForm from "./Forms/ProductForm";

const AllProductsContainer = styled(Container)`
    margin: 2rem auto;
`

const AllProductsRow = styled(Row)`
    gap: 0.75rem;
    padding: 1rem;
    justify-content: center;
`

const TitleCol = styled(Col)`
    display: flex;
`

const ProductOptions = styled(Form.Control)`
    margin: auto 0;
`

const SelectionOptionsRow = styled(Row)`
    transition: all .3s ease-in-out;
`

const SelectionsOptionsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
`

const OffcanvasEditForm = styled(Offcanvas)`
    width: fit-content !important;
`

const AllProducts = (props) => {
    const sliderMinDivision = 350, sliderMaxDivision = 200;

    /** HOOKS */

    const containerRef = useRef(null);
    const width = useContainerWidth(containerRef);
    const [productsData, setProductsData] = useState({});
    const [productWidth, setProductWidth] = useState(200);
    const [productSliderData, setProductSliderData] = useState({
        value: 4,
        min: Math.round(width/sliderMinDivision),
        max: Math.round(width/sliderMaxDivision)
    });
    const [selectMany, setSelectMany] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [showResToast, setShowResToast] = useState(false);
    const [formResult, setFormResult] = useState({ success: false});
    const [formSuccessMessage, setFormSuccessMessage] = useState("");
    const [selectAll, setSelectAll] = useState(false);
    const [previousSelectAll, setPreviousSelectAll] = useState(false);
    const [showMassEditForm, setShowMassEditForm] = useState(false);

    /** HANDLERS */

    const handleToastOpen = (res, message) => {
        setFormSuccessMessage(message);
        setFormResult(res);
        setShowResToast(true);
    }

    const handleToastClose = () => setShowResToast(false);

    const handleProductWidth = (e) => {
        setProductWidth((width - (30*e.target.value)) / e.target.value);
        setProductSliderData({
            value: e.target.value,
            min: Math.round(width/sliderMinDivision),
            max: Math.round(width/sliderMaxDivision)
        });
    }

    const handleProductSelect = (checked, data) => {
        let selected = selectedProducts;
        if (checked === true) {
            selected.push(data);
            setSelectedProducts(selected);
        } else {
            selected = selected.filter(product => product._id != data._id);
            setSelectedProducts(selected);
        }
        selected.length > 0 && console.log(selected);
    }

    const handleSelectAll = () => {
        const newState = !selectAll;
        setPreviousSelectAll(selectAll);
        setSelectAll(newState);
        if (!newState) {
            setSelectedProducts([]);
        }
    }

    const handleMassEdit = () => {
        (selectedProducts.length > 0) && setShowMassEditForm(true);
    }

    const handleMassDelete = async () => {
        if (selectedProducts.length > 0 && confirm(`Are you sure you would like to delete all the selected products?\n\nTHIS IS A PERMANENT ACTION`)) {
            const res = await API_Client.deleteProducts(selectedProducts.map(product => product._id));
            handleToastOpen(res, `Successfully deleted ${selectedProducts.length} products.`)
        }
    }

    /** GETTERS */

    const getProducts = async () => {
        await API_Client.searchProducts().then((data)=>{setProductsData(data)});
    }

    /** EFFECTS */

    useEffect(()=>{
        getProducts();
    }, []);

    useEffect(()=>{
        setProductsData(props.productsData);
    }, [props.productsData]);

    useEffect(() => {
        const min = Math.round(width/sliderMinDivision);
        const max = Math.round(width/sliderMaxDivision);
        const oldValue = productSliderData.value > 0 ? productSliderData.value : Math.round((min+max)/2);
        const newValue = (oldValue > max) ? max : (oldValue < min) ? min : oldValue;
        setProductWidth((width - (30*newValue)) / newValue);
        setProductSliderData({
            value: newValue,
            min: min,
            max: max
        });
    }, [width])

    return (
        <>
            <AllProductsContainer ref={containerRef}>
                <Row>
                    <Col>
                        <h1>All Products</h1>
                    </Col>
                    <TitleCol xs="3">
                        <ProductOptions
                            as={Form.Range}
                            value={productSliderData.value}
                            min={productSliderData.min}
                            max={productSliderData.max}
                            onChange={handleProductWidth}
                        />
                    </TitleCol>
                    <TitleCol xs="2">
                        <ProductOptions
                            as={Form.Check}
                            type="checkbox"
                            name="selectmany"
                            label={window.innerWidth > 991.8 ? "Select Products" : ""}
                            onChange={(e) => setSelectMany(e.target.checked)}
                        />
                    </TitleCol>
                </Row>
                <SelectionOptionsRow style={{ maxHeight: selectMany ? "200px" : "0", opacity: selectMany ? "100" : "0"}}>
                    <SelectionsOptionsContainer>
                        <h6>Selection Options</h6>
                        <Form.Check
                            type="checkbox"
                            label="Select All"
                            onChange={handleSelectAll}
                        />
                        <Button onClick={handleMassEdit} >Mass Edit</Button>
                        <Button onClick={handleMassDelete} variant="danger" >Delete</Button>
                    </SelectionsOptionsContainer>
                </SelectionOptionsRow>
                <hr></hr>
                <AllProductsRow>
                    {
                        productsData ? 
                            productsData.success ?
                                productsData.products.map((item, i)=>{
                                    return <Item
                                        key={i}
                                        data={item}
                                        width={productWidth}
                                        allowSelect={selectMany}
                                        onSelect={handleProductSelect}
                                        selectAll={selectAll}
                                        previousSelectAll={previousSelectAll}
                                        setPreviousSelectAll={setPreviousSelectAll}
                                    />
                                }) :
                                <p>{productsData.error}</p>
                            :
                            <h1>Loading...</h1>
                    }
                </AllProductsRow>
            </AllProductsContainer>

            <OffcanvasEditForm show={showMassEditForm} onHide={() => setShowMassEditForm(false)} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><h2>Mass Product Edit</h2></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container>
                        <ProductForm type="massEdit" selectedProducts={selectedProducts} />
                    </Container>
                </Offcanvas.Body>
            </OffcanvasEditForm>

            <ResultToast
                show={showResToast}
                onClose={handleToastClose}
                success={formResult.success}
                title="Product"
                message={formResult.success ? formSuccessMessage : formResult.error}
            />
        </>
    )
};

export default AllProducts;
