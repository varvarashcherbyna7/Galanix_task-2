import React from 'react';
import { NavLink } from "react-router-dom";
import './BigImage.sass';

const BigImage = (props) => {

    let idParam = props.match.params.id;
    let imgData = props.imagesData.find(img => img.id === +idParam)

    console.log(imgData);

    return (
            <>
                <div className="modal">
                    <div className="modalBody">
                        <img src={imgData.url} alt={`image${imgData.id}`}/>
                        <NavLink to='/Galanix_task-2'><i className="fas fa-times"/></NavLink>
                    </div>
                </div>
            </>

        )
}

export default BigImage;
