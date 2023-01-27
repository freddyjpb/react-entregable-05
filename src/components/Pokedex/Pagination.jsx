import React from 'react';
import './styles/pagination.css';

const Pagination = ({ currentPage, maxNumberOfPages, setCurrentPage }) => {

    const pagesPerBlock = 6;
    const currentBlock = Math.ceil(currentPage / pagesPerBlock);
    const maxNumberOfBlocks = Math.ceil(maxNumberOfPages / pagesPerBlock);
    const arrayOfPages = [];
    const initialBlockPage = (currentBlock - 1) * pagesPerBlock + 1;
    const lastBlockPage = maxNumberOfBlocks === currentBlock ? maxNumberOfPages : currentBlock * pagesPerBlock;

    for (let i = initialBlockPage; i <= lastBlockPage; i++) {
        arrayOfPages.push(i);
    }

    const handlePage = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    const handlePreviousPage = () => {
        if (currentPage - 1 > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () => {
        if (currentPage + 1 <= maxNumberOfPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <div className='pagination'>
            <ul className='pagination__list'>
                <li className='pagination__item' onClick={handlePreviousPage}>&#60;</li>
                {
                    arrayOfPages.map(e => (
                        <li className={`pagination__item ${currentPage === e && 'page__active'}`} onClick={() => handlePage(e)} key={e}>{e}</li>
                    ))
                }
                <li className='pagination__item' onClick={handleNextPage}>&#62;</li>
            </ul>

        </div>
    )
}

export default Pagination