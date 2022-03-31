import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import '../style/allstyling.css'

const Form = () => {
    const [newGame, setNewGame] = useState({
        name: '',
        image: '',
        rating: '',
        description: ''
    })
    // const [errors, setErrors] = useState([]);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newGame.name);
        formData.append('image', newGame.image);
        formData.append('rating', newGame.rating);
        formData.append('description', newGame.description);
        axios.post('http://localhost:8000/api', formData)
            .then(res => {
                console.log(res)
                history.push('/')
            })
            .catch(err => {
                // const { errors } = err.response.data;
                // console.log(errors);
                // const messages = Object.keys(errors).map(error => errors[error].message)
                // console.log(messages);
                // setErrors(messages);
                console.log(err)
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
                            <h3> 🎮New🎮</h3>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active linkcolor" aria-current="page" href="/">Home</a>
                        </li>
                    </ul>
                </div>
                <div className="d-flex flex-column justify-content-around">
                    <h1>Add a New Game:</h1>
                    <>
                        {/* {errors.map((err, index) => <p style={{ color: "red" }} key={index}>{err}</p>)} */}
                    </>
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
                        <div class="mb-3 p-2 bd-highlight">
                            <label for="image" className="form-label">Image:</label>
                            <input className="form-control"  type="file"
                                accept=".png, .jpg, .jpeg"
                                name="image"
                                onChange={handlePhoto}
                                required/>
                        </div>
                        {/* <div className="p-2 bd-highlight">
                            <label htmlFor="image">Image:</label>
                            <input
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                name="image"
                                onChange={handlePhoto}
                                required />
                        </div> */}
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
                                rows="10"
                                value={newGame.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button className="buttonsize " type='submit'>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )

}

export default Form;