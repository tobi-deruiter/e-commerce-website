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
        title: `New product #${i+1}`,
        description: `Wow what a new product!`,
        image: product_img,
        price: i*10,
    })
}

const NewContainer = styled(Container)`
    margin: 2rem auto;
`

const NewCollectRow = styled(Row)`
    display: flex !important;
    flex-direction: column;
    overflow-x: auto;
    max-height: 500px;
    gap: 2rem;
    padding: 1rem;
`

const NewCollectItem = styled(Item)`
    gap: 5rem !important;
`

const NewCollections = (props) => {
    return (
        <NewContainer>
            <h1>NEW COLLECTIONS</h1>
            <hr></hr>
            <NewCollectRow>
                {data.map((item, i)=>{
                    return <NewCollectItem key={i} id={item.id} image={item.image} title={item.title} description={item.description}  />
                })}
            </NewCollectRow>
        </NewContainer>
    )
};

export default NewCollections;
