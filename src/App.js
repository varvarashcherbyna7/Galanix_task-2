import React, { useState } from 'react';
import './App.sass';
import { Route, NavLink } from "react-router-dom";
import { images } from './dataImages';
import BigImage from "./componets/BigImage/BigImage";

const App = () => {
    let [imagesData, setImagesData] = useState([...images]);
    let localImageData = [];
    let date  = new Date();

    // формат дати ДД.ММ.ГГГГ ЧЧ:ММ
    let dateString = ("0" + date.getDate()).slice(-2) + "." + ("0"+(date.getMonth()+1)).slice(-2) + "." +
        date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);

    const onDeleteImg = (e) => {
        let data = imagesData.filter(image => image.id !== e );
        setImagesData(data);

        if (imagesData.length < 13) {
            setImagesData(data )
            //Save data to localStorage
            window.localStorage.setItem('images', JSON.stringify(data));
        }
    }

    if (localStorage.length !== 0) {
        //Get saved data from localStorage
        JSON.parse(localStorage.getItem('images')).map((image) => localImageData.push(image));
    }

    const onRestore = () => {
        // Remove saved data from localStorage
        localStorage.removeItem('images');
        window.location.reload()
    }

    return (
        <>
            <div className="countImages">
                {(localImageData.length !== 0 ? localImageData : imagesData).length } { (localImageData.length !== 0 ? localImageData : imagesData).length > 1 ?  '- кількість світлин' : '- світлина' }
                <div className="date">
                    { dateString }
                </div>
            </div>
            <div className="imagesContainer">
                {
                    (localImageData.length !== 0 ? localImageData : imagesData).map((images) => {
                        return(
                            <div className="imgContainer" key={images.id}>
                                <NavLink to={`/Galanix_task-2/${images.id}`}>
                                    <img src={images.url} alt={`image${images.id}`}/>
                                </NavLink>
                                <div onClick={() => onDeleteImg(images.id)}>
                                    <i className="fas fa-times" />
                                </div>
                            </div>
                        )
                    })
                }
                <div className="btnReestablish" onClick={onRestore}>Відновити</div>
            </div>

            <Route exact path='/Galanix_task-2/:id'
                   render={(props) => <BigImage {...props} imagesData={imagesData}/> } />
        </>
    )
};

export default App;
