import React, { Suspense, useRef } from "react";
import { useParams, NavLink, Outlet, useLocation } from "react-router-dom";
import { fetchDetails } from "../../components/services/api.js";
import { startLinkPic } from "../../components/services/const.js";
import { useState, useEffect } from "react";
import css from "./MovieDetailsPage.module.css";
import picDef from "../../assets/grey.jpg";
import clsx from "clsx";
const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const MovieDetailsPage = () => {
  const [item, setItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const id = params.movieId;
  const location = useLocation();
  // const previousLocation = location.state ?? "/movies";
  const goBackRef = useRef(location?.state ?? "/movies");
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const response = await fetchDetails({ id });
        setItem(response);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [id]);

  if (item.length < 1 && isLoading) {
    return <h3>loading...</h3>;
  }
  const { title, poster_path, release_date, overview, vote_average, genres } =
    item;
  return (
    <div className={css.wrap}>
      <NavLink className={css.goBackLink} to={goBackRef.current}>
        Go back
      </NavLink>
      <div className={css.imgBox}>
        <img
          className={css.img}
          src={poster_path ? `${startLinkPic}${poster_path}` : picDef}
          alt={title}
        />
        <div className={css.box}>
          <h2 className={css.boxTitle}>
            {title}({release_date?.slice(0, 4)})
          </h2>
          <p className={css.boxSubTitle}>
            Users average:
            <i>
              {vote_average
                ? ` ${(vote_average * 10).toFixed(2)}%`
                : "Not specified."}
            </i>
          </p>
          <h3 className={css.boxSubTitle}>Overview:</h3>
          <p className={css.info}>
            {overview ? ` ${overview}` : "Not specified."}
          </p>
          <h3 className={css.boxSubTitle}>Genres:</h3>
          <p className={css.info}>
            {genres?.map((genre) => {
              return (
                <span key={genre.id}>
                  {genre.name}
                  {"  "}
                </span>
              );
            })}
          </p>
        </div>
      </div>
      <div className={css.boxBtn}>
        <h2>Addition information:</h2>
        <ul className={css.list}>
          <li className={css.item}>
            <NavLink to="credits" className={buildLinkClass} state={location}>
              Credits
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={buildLinkClass} state={location}>
              Reviews
            </NavLink>
          </li>
        </ul>
        <Suspense fallback={<h2>Loading...</h2>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;

// https://localhost:5173/
