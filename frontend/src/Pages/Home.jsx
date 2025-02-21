import React from "react"
import Hero from "../Components/Hero";
import Popular from "../Components/Popular";
import NewCollections from "../Components/NewCollections";
import NewsLetter from "../Components/NewsLetter";

const Home = (props) => {
  return (
    <div>
      <Hero/>
      <Popular/>
      <NewCollections/>
      <NewsLetter/>
    </div>
  )
};

export default Home;
