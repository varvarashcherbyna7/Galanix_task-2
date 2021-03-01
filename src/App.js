import React, {useState} from 'react';
import './App.sass';
import { Route, NavLink } from "react-router-dom";
import { images } from './dataImages';
import BigImage from "./componets/BigImage/BigImage";

const App = () => {
    let [imagesData, setImagesData] = useState([...images])

    let date  = new Date();

    // формат дати ДД.ММ.ГГГГ ЧЧ:ММ
    let dateString = ("0" + date.getDate()).slice(-2) + "." + ("0"+(date.getMonth()+1)).slice(-2) + "." +
        date.getFullYear() + " " + ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2);

    const onDeleteImg = (e) => {
        let data = imagesData.filter(image => image.id !== e );

        setImagesData(data);
        //let images = [];
        // Save data to localStorage
        window.localStorage.setItem('images', JSON.stringify(data));
    }


    // Get saved data from localStorage
    let dataLocal = JSON.parse(window.localStorage.getItem('key'));
    console.log(dataLocal);

    // Remove saved data from localStorage
    localStorage.removeItem('key');

    return (
        <>
            <div className="countImages">
                { imagesData.length } { imagesData.length > 1 ?  '- кількість світлин' : '- світлина' }
                <div className="date">
                    { dateString }
                </div>
            </div>
            <div className="imagesContainer">
                {
                    imagesData.map((images) => {
                        return(
                            <div className="imgContainer" key={images.id}>
                                <NavLink to={`/${images.id}`}>
                                    <img src={images.url} alt={`image${images.id}`}/>
                                </NavLink>
                                <div onClick={() => onDeleteImg(images.id)}>
                                    <i className="fas fa-times" />
                                </div>
                            </div>
                        )
                    })
                }
                <div className="btnReestablish">Відновити</div>
            </div>

            <Route exact path='/:id'
                   render={(props) => <BigImage {...props} imagesData={imagesData}/> } />
        </>
    )
};

export default App;
