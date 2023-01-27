import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setTrainerGlobal} from '../store/slices/trainer.slice'

import circles from '../assets/circles.png'

import '../App.css';

const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(setTrainerGlobal(e.target.name.value.trim()));
        e.target.name.value = '';
        navigate('/pokedex');
    }

  return (
    <div className='home__page'>
        <img className='home__img' src="/pokedex.png" alt="pokedex" />
        <h1 className='home__title'>Welcome Trainer !</h1>
        <p className='home__p'>Let's Go . . .</p>
        <form className='home__input__section' onSubmit={handleSubmit}>
            <input id='name' type="text" placeholder='Place your name here . . .' />
            <button className='home__button'>Start</button>
        </form>
        <div className='footer__section'>
          <img className='circle__img' src={circles} alt="cicle" />
          <div className='_red'></div>
          <div className='_black'></div>
        </div>
    </div>
  )
}

export default Home