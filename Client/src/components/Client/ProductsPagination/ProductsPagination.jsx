import React, { useEffect } from 'react';
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setCurrentFilteredProducts, 
  setCurrentPage 
} from '../../../Redux/Features/products/clientProductsSlice';

const itemRender = (_, type, originalElement) => {
  if (type === 'prev') {
    return <a>Previous</a>;
  }
  if (type === 'next') {
    return <a>Next</a>;
  }
  return originalElement;
};

const ProductsPagination = () => {
    const dispatch = useDispatch();
    const filteredProducts = useSelector(state => state.clientProducts.filteredProducts);
    const currentPage = useSelector(state => state.clientProducts.currentPage);

    const totalItems = filteredProducts.length;
    const itemsPerPage = 5;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    useEffect(() => {
      dispatch(setCurrentPage(1));
    }, []);
    
    useEffect(() => {
      if (filteredProducts.length > 0) {
        const currentFilteredProducts = filteredProducts.slice(startIndex, endIndex);
        dispatch(setCurrentFilteredProducts(currentFilteredProducts));
      } else {
        dispatch(setCurrentPage(1));
        dispatch(setCurrentFilteredProducts([]));
      }
    }, [filteredProducts, currentPage, dispatch, startIndex, endIndex]);

    const handlePageChange = (pageNumber) => {
      dispatch(setCurrentPage(pageNumber));
    };

    return (
        <Pagination
            total={ totalItems }
            current={ currentPage }
            defaultPageSize={ itemsPerPage }
            onChange={ handlePageChange }
            itemRender={ itemRender }
        />
    );
};

export default ProductsPagination;