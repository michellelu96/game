import React, { useState,useEffect } from "react";
import axios from 'axios'
import { useHistory, useParams } from "react-router-dom";
import '../style/allstyling.css'


const EditForm = () => {
    const [newGame, setNewGame] = useState({
        name: '',
        image: '',
        rating: 0,
        description: ''
    })
    // const [errors, setErrors] = useState([]);
    const history = useHistory();
    const { id } = useParams();

    
    useEffect(() => {
        axios.get('http://localhost:8000/api/game/' + id)
            .then(res => {
                setNewGame(res.data)
            })
            .catch(err => console.log(err))
    }, [id] )

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newGame.name);
        formData.append('image', newGame.image);
        formData.append('rating', newGame.rating);
        formData.append('description', newGame.description);
        axios.put('http://localhost:8000/api/game/edit/' + id, formData)
            .then(res => {
                console.log(res)
                history.push('/')
            })
            .catch(err => {
                console.log(err)
                console.log("error")
            })

    }

    const handleChange = (e) => {
        setNewGame({ ...newGame, [e.target.name]: e.target.value });
    }


    const handlePhoto = (e) => {
        setNewGame({ ...newGame, image: e.target.files[0] });
    }

    return (
        <>
            <div className=" container background">
                <div>
                    <ul className="nav justify-content-center navbar">
                    <li >
                            <h3> 🎮Edit🎮</h3>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active linkcolor" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link linkcolor" href="/new">New</a>
                        </li>
                    </ul>
                </div>
                <div className="d-flex flex-column justify-content-around">
                    <h1>Edit Game Review:</h1>
                    <>
                    </>
                    {/* needs encType for multer to get info! do not take out, validations are from bootstrap */}
                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="needs-validation" novalidate>
                    <div className="p-2 bd-highlight">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={newGame.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="p-2 bd-highlight">
                        <label htmlFor="image">Image:</label>
                        <input
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            name="image"
                            onChange={handlePhoto}
                            required
                        />
                        </div>
                        <div className="p-2 bd-highlight">
                            <label htmlFor="rating">Rating:</label>
                            <input
                                type="number"
                                name="rating"
                                value={newGame.rating}
                                onChange={handleChange}
                                min='0' max='10'
                                step="0.5"
                                required
                            />
                        </div>
                        <div className="p-2 bd-highlight">
                            <p>Review:</p>
                            <textarea
                                name="description"
                                rows='10'
                                cols="50"
                                value={newGame.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )

}

export default EditForm;