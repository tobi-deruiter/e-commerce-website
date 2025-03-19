import React, { useEffect, useState } from "react"
import Form from 'react-bootstrap/Form';
import API_Client from "../../api/apiClient";
import NewTagForm from "./NewTagForm";

const DefaultTagsForm = (props) => {
    const [defaultTags, setDefaultTags] = useState([]);
    const [currentTags, setCurrentTags] = useState([]);

    const getTags = async () => {
        await API_Client.getProductTags().then((data)=>{setCurrentTags(data)});
    }

    const getDefaultTags = async () => {
        try {
            const res = await API_Client.getProductsById([import.meta.env.VITE_PRODUCT_DEFAULT_SETTINGS_ID]);
            if (res.success) {
                const tags = res.products[0].tags;
                for (const i in tags) {
                    props.handleDefaultTags(tags[i]);
                }
                setDefaultTags(tags);
                return;
            }
            throw new Error("Could Not Retrieve Default Portfolios/Tags");
        } catch (err) {
            console.log(err);
            alert(err);
        }
    }

    useEffect(() => {
        getTags();
        getDefaultTags();
    }, []);

    useEffect(() => {
        for (const i in defaultTags) {
            props.handleDefaultTags(defaultTags[i]);
        }
    }, [defaultTags]);

    return (
        <div>
            <h4>Set Default Categories/Portfolios</h4>
            <p>These are categories that will always persist even if no product is in them.</p>
            <NewTagForm isPortfolioForm handleTags={props.handleDefaultTags} tagsData={{tags: defaultTags}} defaultTags={defaultTags} />
            <br />
            <h4>Set Default Tags</h4>
            <p>These are tags that will always persist even if no product uses them.</p>
            <NewTagForm handleTags={props.handleDefaultTags} tagsData={{tags: defaultTags}} defaultTags={defaultTags} />
        </div>
    )
};

export default DefaultTagsForm;
