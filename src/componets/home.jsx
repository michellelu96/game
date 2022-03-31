import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import '../style/allstyling.css'
import Carousel from 'react-bootstrap/Carousel'


const Home = () => {
    const [allGames, setAllGames] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:8000/api')
            .then(res => setAllGames(res.data))
            .catch(err => console.log(err))
    }, [])

    const deleteGame = (id) => {
        axios.delete("http://localhost:8000/api/game/delete/" + id)
            .then(res => {
                console.log(res.data)
                console.log("SUCCESS DELETE");
                setAllGames(allGames.filter((game) => game._id !== id))
                history.push('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <>
            <div className='container background'>
                <div>
                    <ul className="nav justify-content-center navbar">
                        <li >
                            <h3> Welcome!~🎮❤️</h3>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active linkcolor" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link linkcolor" href="/new">New</a>
                        </li>
                    </ul>
                </div>
                <h1>Reviewed Games:</h1>
               <div>
                <Carousel fade>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 carouselimages"
                            src={`http://localhost:8000/image/020e3152-4c59-4a48-9a4b-e6323a0ffa1b-1648593136057.jpg`}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3 className='carouseltext'>Genshin Impact</h3>
                            <p className='carouseltext'>Rating : 8</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 carouselimages"
                            src={`http://localhost:8000/image/3a2a3b59-6fcf-4166-bc9c-88419f06c812-1648709791934.jpg`}
                            alt="Second slide"
                        />

                        <Carousel.Caption>
                            <h3 className='carouseltext'>Final Fantasty XIV</h3>
                            <p className='carouseltext'>Rating: 9</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 carouselimages"
                            src={`http://localhost:8000/image/0181afe7-ad42-4129-8ea4-eff291f67d83-1648708622601.jpg`}
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3 className='carouseltext'>Monster Hunter:World</h3>
                            <p className='carouseltext'>Rating: 9</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <div className="d-flex  flex-wrap justify-content-around">

                    {
                        allGames.map((game, key) => {
                            return (
                                <div key={key} className="card cardmargins" style={{ width: '18rem' }}>
                                    <Link to={`/game/${game._id}`}><img height="200px" width="250px" src={`http://localhost:8000/image/${game.image}`} className="card-img-top" alt={game.name} /></Link>
                                    <div className="card-body cardbodycolor">
                                        <Link to={`/game/${game._id}`} className="linkcolor"><h5 className="card-title">{game.name}</h5></Link>
                                        <p className="card-text">My Current Rating: {game.rating}</p>
                                        {/* <button onClick={() => deleteGame(game._id)}>Delete</button> */}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
        </>
    )

}

export default Home;