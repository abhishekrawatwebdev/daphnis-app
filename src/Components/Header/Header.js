import React from 'react'
import './header.css'
import { useState } from 'react';
import { useEffect } from 'react';
import fetchProducts from '../../Services/fetchAllProducts';
import Loader from '../Loader/Loader';

const Header = (props) => {

    const [categories,setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const loadData = async () => {
        setIsLoading(true)
        let data = await fetchProducts();
        const categories = await data.map(item => item.category)
            .filter((value, index, self) => self.indexOf(value) === index)
            setCategories(categories)
        setIsLoading(false)
    }
    useEffect(()=>{
        loadData()
    },[])
  return (
      isLoading ? <Loader /> : <div className='header'>
          <h1 className="logo">Shopilyy</h1>
          <div className="category-selector">
              <select onChange={(e) => { props.setCategory(e.target.value) }} name="category" id="category">
                  <option defaultValue={props.defaultValue} value="All">All</option>
                  {
                      categories.map(item => {
                          return (
                              <option key={item} value={item}>{item}</option>
                          )
                      })
                  }

              </select>
          </div>
      </div>
  )
}

export default Header