import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './styles/pokeCard.css'

const PokeCard = ({ url }) => {
    // console.log(url);

    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState();

    useEffect(() => {
        axios.get(url)
            .then(response => setPokemon(response.data))
            .catch(err => console.log('err', err))
    }, []);

    const handleClick = () => navigate(`/pokedex/${pokemon.id}`);

    return (
        <article className={`poke__card border__${pokemon?.types[0].type.name}`} onClick={handleClick}>
            <header className={`poke__card__header bg__${pokemon?.types[0].type.name}`}>
                <img className='poke__card__img' src={pokemon?.sprites.other['official-artwork'].front_default} alt="" />
            </header>
            <section className='poke__card__body'>
                <h3 className={`poke__card__name color__${pokemon?.types[0].type.name}`}>{pokemon?.name}</h3>
                <ul className='poke__card__types__container'>
                    {
                        pokemon?.types.map((type) => (<li className='poke__card__type' key={type.type.name}>{type.type.name}</li>))
                    }
                </ul>
                <p>Type</p>
            </section>
            <footer className='poke__card__footer'>
                <ul className='poke__card__stats__container'>
                    {
                        pokemon?.stats.map((stat) => (
                            <li className='poke__card__stat' key={stat.stat.name}>
                                <span className='poke__card__label'>{stat.stat.name}</span>
                                <span className={`poke__card__number color__${pokemon?.types[0].type.name}`}>{stat.base_stat}</span>
                            </li>
                        ))
                    }
                </ul>
            </footer>
        </article>
    )
}
export default PokeCard