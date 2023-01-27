import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setThemeGlobal } from '../store/slices/theme.slice';
import { setPokemonsPerPageGlobal } from '../store/slices/pokemonsPerPage.slice';

import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import circlesr from '../assets/circlesr.png';
import circles from '../assets/circles.png';
import '../App.css';

const Config = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const goBack = () => navigate(-1);
  const goHome = () => navigate('/');
  const { theme } = useSelector(state => state);
  const { pokemonsPerPage } = useSelector(state => state);

  useEffect(() => {
    if (theme === true) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [theme])

  const handleChange = (e) => {
    dispatch(setPokemonsPerPageGlobal(e.target.value));
  }

  return (
    <>
      <div className='pokedex__red'></div>
      <div className='pokedex__black'></div>
      <img className='pokedex__circles' src={circlesr} alt="" />
      <ArrowBackIcon className='back__icon' onClick={goBack} />
      <img onClick={goHome} className='pokedex__img' src="/Home/pokedex.png" alt="pokedex" />
      <section className='config__section' >
        <div className='config__dark__mode'>
          <SettingsBrightnessIcon sx={{ fontSize: 70 }} onClick={() => { dispatch(setThemeGlobal(!theme)) }} style={{ cursor: 'pointer' }} />
          <div className='config__msg' style={{ fontWeight: 'bolder' }}>{theme ? 'Set Light Mode' : 'Set Dark Mode'}</div>
        </div>
        <div className='config__pokesPerPage'>
          <select className='config__options__per__page' onChange={handleChange}>
            <option value={pokemonsPerPage}>{pokemonsPerPage}</option>
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={16}>16</option>
            <option value={20}>20</option>
          </select>
          <div className='config__msg' style={{ fontWeight: 'bolder' }}>Select Number Of Cards Per Page</div>
        </div>
      </section>
      <img className='circle__img' src={circles} alt="cicle" />
      <div className='_red'></div>
      <div className='_black'></div>
    </>
  )
}

export default Config