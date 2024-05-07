import axios from 'axios'
import React from 'react'
import { Hourglass } from 'react-loader-spinner';
import { useQuery } from 'react-query';

export default function Brands() {

  function getBrands() {
    return axios.get( 'https://ecommerce.routemisr.com/api/v1/brands' );
  }

  const { data, isLoading } = useQuery( 'getBrands', getBrands );

  if (isLoading) {
    return (
      <div className="d-flex vh-100 bg-success bg-opacity-50 justify-content-center align-items-center">
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["#fff", "#fff"]}
        />
      </div>
    );
  }

  return (
    <>
      <div className="container">
        <h2 className='mt-3 text-success text-center fw-bold'>All Brands</h2>
        <div className="row">
          {data.data.data.map((brand) => {
            return <div key={brand._id} className="col-md-3">
              <div className="product my-3 border rounded-3">
                <img
                  src={brand.image}
                  className="w-100"
                  style={ {height : '200px'} }
                  alt={brand.name}
                />
                <h4 className="text-center py-3 text-success fw-bold">{brand.name}</h4>
              </div>
            </div>;
          })}
        </div>
      </div>
    </>
  )
}
