import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Swal from "sweetalert2";

import circlesr from '../assets/circlesr.png'
import statsImg from '../assets/Group 233.png';
import movementImg from '../assets/Group 234.png';

const PokedexId = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`
    axios.get(URL)
      .then(response => setPokemon(response.data))
      .catch(err => {
        navigate('/pokedex');
        console.log('err', err);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: `Pokemon " ${id} " does not exist, please enter a valid pokemon name`,
          showConfirmButton: true,
          confirmButtonColor: '#D93F3F',
        });
      });
  }, [id]);

  // console.log('pokemonSearch', pokemon);
  const filteredStats = pokemon?.stats.filter(stat => stat.stat.name !== 'special-attack' & stat.stat.name !== 'special-defense');
  const goBack = () => navigate(-1);
  const goHome = () => navigate('/');

  return (
    <>
      <div>
        <div className='pokedex__red'></div>
        <div className='pokedex__black'></div>
        <img className='pokedex__circles' src={circlesr} alt="" />
        <ArrowBackIcon className='back__icon' onClick={goBack} />
        <img className='pokedex__img' src="/pokedex.png" alt="pokedex" onClick={goHome} />
        <div className='pokedexid__card_container'>
          <div className={`pokedex__upper__card bg__${pokemon?.types[0].type.name}`}>
            <img className='pokedexid__img' src={pokemon?.sprites.other['official-artwork'].front_default} alt="pokemon image" />
          </div>
          <div className='pokedexid__body'>
            <div className='pokedexid__title__info'>
              <h3 className={`color__${pokemon?.types[0].type.name}`}>{`#${pokemon?.id}`}</h3>
              <div className='pokedex__name__title'>
                <hr />
                <h1 className={`color__${pokemon?.types[0].type.name}`}>{pokemon?.name}</h1>
                <hr />
              </div>
              <div className='pokedexid__measurements'>
                <div>
                  <p className='measurement__title'>Weight</p>
                  <p className='measurement'>{pokemon?.weight}</p>
                </div>
                <div>
                  <p className='measurement__title'>Height</p>
                  <p className='measurement'>{pokemon?.height}</p>
                </div>
              </div>
            </div>
            <div className='pokedexid__strengths__container'>
              <div className="column__left">
                <h2>Type</h2>
                <ul className='column__items'>
                  {
                    pokemon?.types.map((type) => (<li className={`poke__type bg__color__${type.type.name}`} key={type.type.name}>{type.type.name}</li>))
                  }
                </ul>
              </div>
              <div className="column__right">
                <h2>Abilities</h2>
                <ul className='column__items'>
                  {
                    pokemon?.abilities.map((ability) => (<li className='poke__ability' key={ability.ability.name}>{ability.ability.name}</li>))
                  }
                </ul>
              </div>
            </div>
            <div className="pokedexid__stats_container">
              <img src={statsImg} className='stats__img' alt="image" />
              <ul className='stats__row__container'>
                {
                  filteredStats?.map((stat) => (
                    <>
                      <li className='poke__card__stats stats__row' key={stat.stat.name}><span>{stat.stat.name}</span><span>{stat.base_stat}/160</span></li>
                      <div className='progress-bar-container'>
                        <div className='progress-filler' style={{ width: `${(stat.base_stat) * 100 / 160}%`, max: '160' }}>
                        </div>
                      </div>
                    </>
                  ))
                }
              </ul>
            </div>
          </div>
          <div className='pokedexid__movements__container'>
            <img src={movementImg} className='movement__img' alt="image" />
            <div className='pokedexid__movements__subcontainer'>
              {
                pokemon?.moves.map((move) => (<li className='pokedexid__movement__item' key={move.move.name}>{move.move.name}</li>))
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PokedexId