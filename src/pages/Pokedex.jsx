import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pokedex/Pagination';
import PokeCard from '../components/Pokedex/PokeCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import circles from '../assets/circlesr.png';

const Pokedex = () => {

  const { trainer } = useSelector(state => state);
  const [pokemons, setPokemons] = useState();
  const [types, setTypes] = useState([])
  const [typeSelected, setTypeSelected] = useState('All pokemons');
  const navigate = useNavigate();


  useEffect(() => {
    if (typeSelected !== "All pokemons") {
      //! Make a single type request
      axios.get(typeSelected)
        // ! The make helps get the same data strucure response as the request all get
        .then(response => setPokemons(response.data.pokemon.map(e => e.pokemon)))
        .catch(err => console.log('err', err));
    } else {
      //! Make a full request
      const URL = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000000'
      axios.get(URL)
        .then(response => setPokemons(response.data.results))
        .catch(err => console.log('err', err));
    }
  }, [typeSelected]);

  //! Get the different pokemon types to display for Type search
  useEffect(() => {
    const URL = 'https://pokeapi.co/api/v2/type';
    axios.get(URL)
      .then(response => setTypes(response.data.results))
      .catch(err => console.log('err', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.search.value.trim().toLowerCase();
    navigate(`/pokedex/${input}`)
  }

  const handleChange = (e) => {
    setTypeSelected(e.target.value);
    setCurrentPage(1);
  }

  //! Pagination
  const [currentPage, setCurrentPage] = useState(1);
  //! Global
  const { pokemonsPerPage } = useSelector(state => state);
  const initialIndex = (currentPage - 1) * pokemonsPerPage;
  const finalIndex = currentPage * pokemonsPerPage;
  const maxNumberOfPages = pokemons && Math.ceil(pokemons?.length / pokemonsPerPage);
  console.log(pokemons?.length)
  console.log(maxNumberOfPages);
  console.log(pokemonsPerPage);

  const goBack = () => navigate(-1);
  const goHome = () => navigate('/');

  return (
    <div>
      <div className='pokedex__red'></div>
      <div className='pokedex__black'></div>
      <img className='pokedex__circles' src={circles} alt="" />
      <ArrowBackIcon className='back__icon' onClick={goBack} />
      <img onClick={goHome} className='pokedex__img' src="/pokedex.png" alt="pokedex" />
      <h2 className='pokedex__welcome'>Welcome {trainer}, <span className='pokedex__welcome__span'> here you can find your favorite pokemons.</span></h2>
      <div className='search__section'>
        <form className='search__form' onSubmit={handleSubmit}>
          <input type="text" id='search' placeholder='Search for a Pokemon' />
          <button>Search</button>
        </form>
        <select className='pokedex__select' onChange={handleChange}>
          <option value="All pokemons">All pokemons</option>
          {
            types?.map(type => (
              <option className='pokedex__option' key={type.url} value={type.url}>{type.name}</option>
            ))
          }
        </select>
      </div>
      <div className='pokemon__container'>
        {
          pokemons?.slice(initialIndex, finalIndex).map((pokemon) => (
            <PokeCard key={pokemon.url} url={pokemon.url} />
          ))
        }
      </div>
      {/* PAGINATION  */}
      <Pagination currentPage={currentPage} maxNumberOfPages={maxNumberOfPages} setCurrentPage={setCurrentPage} />
    </div>
  )
}

export default Pokedex