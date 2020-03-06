import React from 'react'
import Pagination from 'react-bootstrap/Pagination'
import PageItem from 'react-bootstrap/PageItem'
const { Ellipsis, First, Last, Next, Prev } = PageItem

class PaginationComponent extends React.Component {

    render() {
        const { totalPage, currentPage } = this.props
        const firstPage = 1
        const lastPage = totalPage
        const middlePageNo = Math.ceil(totalPage / 2)
        return (
            totalPage
            &&
            <Pagination size="sm">
                <First />
                <Prev />
                <PageItem active={currentPage===firstPage}>{firstPage}</PageItem>
                <Ellipsis />
                { totalPage > 2 &&
                    <PageItem active={currentPage===middlePageNo}>{middlePageNo}</PageItem>
                }
                <Ellipsis />
                <PageItem active={currentPage===lastPage}>{lastPage}</PageItem>
                <Next />
                <Last />
            </Pagination>
        )
    }
}

export default PaginationComponent