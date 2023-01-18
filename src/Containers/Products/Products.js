/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Card from '../../Components/Card/Card'
import Loader from '../../Components/Loader/Loader';
import PieChart from '../../Components/PieChart/Pie';
import fetchProducts from '../../Services/fetchAllProducts';
import './products.css'
const Products = (props) => {
    const [productsData,setProductsData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [dataValues, setDataValues] = useState([]);
    const [pieVisible,setPieVisible] = useState(false);

    const loadData=async()=>{
        setIsLoading(true)
        let data=await fetchProducts();

        const categories = await data.map(item => item.category)
            .filter((value, index, self) => self.indexOf(value) === index)
        setCategories(categories);
        setIsLoading(false)
        if (props.category === 'All') {
            setProductsData(data)
        }
        else {
            const filteredData = data.filter((item) => {
                return item.category === props.category
            })
            setProductsData(filteredData)
        }
        return data;
    };

   
    const data = {
        labels: categories.map((item)=>item),
        datasets: [
            {
                label: 'Categories in Catalogue',

                data: [4,4,6,6],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }

    const getLength = async (category) => {
        let data = await fetchProducts();
        const length = data.filter((item) => {
            return item.category === category
        })
        return length.length
    }

    useEffect(()=>{
        loadData()
    },[props])
  return (
      isLoading ? <Loader /> :
      <div className='products-section'>
              <button className='analyze-btn' onClick={async() => {
                setIsLoading(true)
                for(let i=0;i<categories.length;i++){
                    let number= await getLength(categories[i]);
                    setPieVisible(false)
                    setDataValues([...dataValues,number])
                }
                setPieVisible(true)
                setIsLoading(false)
              }}>Analyze</button>
              
              {dataValues?.length >0 && pieVisible ?
              <div className="analyze-pie">
                <div onClick={()=>setPieVisible(false)} className="close-modal">X</div>
                      <PieChart heading="Categories in Catalogue" data={data}/>
              </div>: null}
          <div className="cards-section">
              {
                  productsData ? productsData.map((item) => {
                      return (
                          <Card category={item.category} name={item.title} img={item.image} key={item.id} description={item.description} />
                      )
                  }) : null
              }
          </div>
      </div>
  )
}

export default Products