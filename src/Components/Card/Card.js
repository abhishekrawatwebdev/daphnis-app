import React from 'react';
import { useState } from 'react';
import './card.css';

const Card = (props) => {
    const [isReadMore,setIsReadMore] = useState(false);

    const stringTerminator=(string,limit)=>{
        let newString
        if(string.length>150){
            newString = string.slice(0,limit)+'...';
            return newString;
        }
        else{
            return string;
        }
    }
    return (
        <div className='card-container' onClick={props.onclick}>
            <div className="card-img">
                <img src={props.img} alt="product" className='product-img' />
                <p className='product-category-tag'>{props.category}</p>
            </div>
            <div className="card-bottom">
                <h3 className="product-name">{props.name}</h3>
                <div className="product-description">
                    <p className='description'>{isReadMore ? props.description : stringTerminator(props.description, 150)}</p>
                    {
                        (props.description.length>150)?
                            (<div className='read-more'>{isReadMore && (props.description.length > 150) ? (<p onClick={() => setIsReadMore(false)}>Read less</p>) : (<p onClick={() => setIsReadMore(true)}>Read more</p>)}</div>)
                        :null
                    }
                </div>
            </div>
        </div>
    )
}

export default Card