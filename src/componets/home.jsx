import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import '../style/allstyling.css'
import Carousel from 'react-bootstrap/Carousel'


const Home = () => {
    const [allGames, setAllGames] = useState([]);
    const [threeItems, setThreeItems] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api')
            .then(res => {
                setAllGames(res.data)
                setThreeItems(res.data.slice(-3))
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
        {/* the navbar! */}
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
                    {/* carousel with three last items in it */}
                {
                        threeItems.map((games, key) => {
                            return (
                                <Carousel.Item key ={key}>
                                <Link className="linkcolor" to={`/game/${games._id}`}><img
                                    className="d-block w-100 carouselimages"
                                    src={`http://localhost:8000/image/${games.image}`}
                                    alt="First slide"
                                /></Link>
                                <Carousel.Caption>
                                    <h3 className='carouseltext'> <Link className="linkcolor" to={`/game/${games._id}`}>{games.name}</Link></h3>
                                    <p className='carouseltext'>Rating: {games.rating}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            )
                        })
                    }
                </Carousel>
                <div className="d-flex  flex-wrap justify-content-around">
                    {/* map all items in the database into a card */}
                    {
                        allGames.map((game, key) => {
                            return (
                                <div key={key} className="card cardmargins" style={{ width: '18rem' }}>
                                    <Link to={`/game/${game._id}`}><img height="200px" width="250px" src={`http://localhost:8000/image/${game.image}`} className="card-img-top" alt={game.name} /></Link>
                                    <div className="card-body cardbodycolor">
                                        <Link to={`/game/${game._id}`} className="linkcolor"><h5 className="card-title">{game.name}</h5></Link>
                                        <p className="card-text">My Current Rating: {game.rating}</p>
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