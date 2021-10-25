import React, { FC } from 'react'
import { Pagination } from 'react-bootstrap'

type Props = {
    pageObject: any
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    toTop: boolean
}

const Paginator: FC<Props> = (props) => {
    const { pageObject, setCurrentPage, toTop } = props

    if (!pageObject) {
        return <></>
    }

    const { currentPage, totalItems, pages, endPage } = pageObject

    if (totalItems === 0) {
        return <></>
    }

    const scrollToTop = (): void => {
        if (toTop) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
        }
    }

    const renderPaginationItems = (): JSX.Element[] =>
        pages.map(
            (page: number): JSX.Element => (
                <Pagination.Item
                    onClick={() => {
                        scrollToTop()
                        setCurrentPage(page)
                    }}
                    key={page}
                    active={page === currentPage}
                >
                    {page}
                </Pagination.Item>
            )
        )

    return (
        <div className="pagination-container mt-4">
            <Pagination>
                <Pagination.Item
                    onClick={() => {
                        if (parseInt(currentPage, 10) - 1 < 1) {
                            return
                        }
                        scrollToTop()
                        setCurrentPage(parseInt(currentPage, 10) - 1)
                    }}
                    disabled={parseInt(currentPage, 10) - 1 < 1}
                >
                    Previous
                </Pagination.Item>
                {renderPaginationItems()}
                <Pagination.Item
                    onClick={() => {
                        if (parseInt(currentPage, 10) + 1 > endPage) {
                            return
                        }
                        scrollToTop()
                        setCurrentPage(parseInt(currentPage, 10) + 1)
                    }}
                    disabled={parseInt(currentPage, 10) + 1 > endPage}
                >
                    Next
                </Pagination.Item>
            </Pagination>
        </div>
    )
}

export default Paginator
