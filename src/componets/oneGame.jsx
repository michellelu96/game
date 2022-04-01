
import React, { useState, useEffect } from "react";
import { useParams,Link,useHistory } from "react-router-dom";
import axios from 'axios'
import '../style/allstyling.css'

const OneGame = () => {
    const [oneGame, setOneGame] = useState({});
    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        axios.get('http://localhost:8000/api/game/' + id)
            .then(res => {
                setOneGame(res.data)
            })
            .catch(err => console.log(err))
    }, [id] )
    
    const deleteGame = (id) => {
        axios.delete("http://localhost:8000/api/game/delete/" + id)
            .then(res => {
                console.log(res.data)
                console.log("SUCCESS DELETE");
                history.push('/')
            })
            .catch(err => console.log(err))
    }

    return (
        <>
        {/* navbar */}
        <div className="container background">
            <div>
                <ul className=" d-flex nav justify-content-center navbar">
                <li>
                            <h3>🎮❤️</h3>
                        </li>
                    <li className="nav-item">
                        <a className="nav-link active linkcolor" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link linkcolor" href="/new">New</a>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link linkcolor" to={`/edit/${oneGame._id}`}>Edit</Link>
                    </li>
                    <li className="nav-item">
                    <button className=" nav-link btn btn-link linkcolor" onClick={() => deleteGame(oneGame._id)}>Delete</button>
                    </li>
                </ul>
            </div>
            <div >
                {/* things that are in the item */}
                <div className="row">
                    <img className="col rounded float-start" height="400px" width="400px" src={`http://localhost:8000/image/${oneGame.image}`} alt={oneGame.name}></img>
                    <h1 className="col">{oneGame.name}</h1>
                    <h1 className="col">Rating : {oneGame.rating}</h1>
                    <div>
                        <p>{oneGame.description}</p>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default OneGame;
