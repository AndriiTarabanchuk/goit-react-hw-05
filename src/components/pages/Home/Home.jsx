import css from "./Home.module.css";
import React from "react";
import HomeList from "../../HomeList/HomeList";

import { useState, useEffect } from "react";
import { fetchNews } from "../../services/api.js";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchNews();
        setItems((pref) => [...pref, ...response.results]);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, []);
  if (!items && isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h2>Home</h2>
      <HomeList items={items} />
    </div>
  );
};

export default Home;
