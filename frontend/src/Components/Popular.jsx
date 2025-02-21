import React from "react"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import styled from 'styled-components';
import product_img from "./Assets/item-img-placeholder.png"
import Item from "./Item";

var data = []
for (let i = 0; i < 10; i++) {
    data.push({
        id: i,
        title: `Cool product #${i+1}`,
        description: `Wow what a cool product!`,
        image: product_img,
        price: i*10,
    })
}

const PopularContainer = styled(Container)`
    margin: 2rem auto;
`

const PopularRow = styled(Row)`
    display: flex !important;
    flex-direction: column;
    overflow-x: auto;
    max-height: 500px;
    gap: 2rem;
    padding: 1rem;
`

const PopularItem = styled(Item)`
    gap: 5rem !important;
`

const Popular = (props) => {
    return (
        <PopularContainer>
            <h1>POPULAR</h1>
            <hr></hr>
            <PopularRow>
                {data.map((item, i)=>{
                    return <PopularItem key={i} id={item.id} image={item.image} title={item.title} description={item.description}  />
                })}
            </PopularRow>
        </PopularContainer>
    )
};

export default Popular;
