import React, { useMemo } from 'react';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { HeroCard } from '../heroes/HeroCard';
import { getHeroesByName } from '../../selectors/getHeroesByName';

export const SearchScreen = ({ history }) => {
    const location = useLocation();

    const { search } = location;
    const { q = '' } = queryString.parse(search);

    const [formValues, handleInputChange] = useForm({
        hero: q,
    });

    const { hero } = formValues;

    const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

    const handleSearch = (e) => {
        e.preventDefault();

        history.push(`?q=${hero}`);
    };

    return (
        <div>
            <h1>SearchScreen</h1>
            <hr />

            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr />

                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            name="hero"
                            placeholder="Find your hero"
                            className="form-control"
                            autoComplete="off"
                            onChange={handleInputChange}
                            value={hero}
                        />

                        <button type="submit" className="btn m-1 btn-block btn-outline-primary">
                            Search
                        </button>
                    </form>
                </div>
                <div className="col-7">
                    <h4>Results</h4>
                    <hr />
                    {q === '' && <div className="alert alert-info">Search a hero</div>}

                    {q !== '' && heroesFiltered.length === 0 && (
                        <div className="alert alert-danger">There is no a hero with {q}</div>
                    )}

                    {heroesFiltered.map((hero) => (
                        <HeroCard key={hero.id} {...hero} />
                    ))}
                </div>
            </div>
        </div>
    );
};
