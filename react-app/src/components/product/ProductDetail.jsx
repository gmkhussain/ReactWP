import React, { useState, useEffect, useCallback } from 'react'
import { withRouter } from "react-router-dom";
import PublicLayout from '../layout/PublicLayout'

import clientConfig from '../../config/client-config';

import axios from 'axios'

const ProductDetail = (props) => {
    
    const _ProductId = props.match.params.id

    const [ productInfo, setProductInfo ] = useState({
                    product: {
                        title: { rendered: 'No Data' },
                        content: { rendered: 'No Data' },
                    },
                    loading: false
                })


    const getProduct = useCallback((_id) => {
    // const getProduct = (_id) => {

        setProductInfo({
            ...productInfo,
            loading: true
        })

        axios.get(`${clientConfig.rootUrl}/wp-json/wp/v2/product/${_id}`)
            .then(
                res => {
                    console.log(res.data)
                    setProductInfo({
                        ...productInfo,
                        product: res.data,
                        loading: false
                    })
                }
            )
            .catch(
                err => {
                  console.log(err)
                }
            )
    }, [] )


    useEffect( ()=> {
        getProduct( _ProductId )
    }, [getProduct])


    const { product, loading } = productInfo


    return (
        <PublicLayout>
          <div className="container">

            { loading ? " Loading... " :   
                <div>
                    <small>{product.id}</small>
                    <h4>{product.title.rendered} </h4>
                    <p>{product.content.rendered}</p>
                </div>
            }
            
          </div>  
        </PublicLayout>
    )    
}

export default withRouter(ProductDetail)
