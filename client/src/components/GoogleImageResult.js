import React, { Component } from 'react'
import { MDBInput, MDBContainer, MDBRow, MDBCol, MDBBadge, MDBIcon, MDBBtn } from 'mdbreact'
import { connect } from 'react-redux';
import { AppActions } from '../actions';
import Loader from './Loader'
import GalleryImage from './GalleryImage';

class GoogleImageResult extends Component {

    handleSearch = (event) => {
        let searchString = event.target.value
        if (searchString) {
            this.props.updateSearchString(searchString)
        }
        var code = (event.keyCode ? event.keyCode : event.which);
        if (code === 13) {
            //call search api
            this.props.getImageList()
        }
    }
    noResultsJSX() {
        return (
            <div className="no-image-result">
                <MDBBadge color="light" className="result-tags">
                    Result Found: 0
                </MDBBadge>
                <span>&nbsp; Try different search tags</span>
            </div>
        )
    }
    fetchPage(isNextPage) {
        let currentPage = Number(this.props.options.page)
        // parameter page is actually startIndex
        const pageNo = isNextPage ? currentPage + 10 : currentPage - 10
        this.props.updateSearchOptions({
            page: pageNo,
        })
        //call search api
        this.props.getImageList()
    }
    getSelectedFilterTagsJSX() {
        const { options, resultCount} = this.props
        return (
            <div className="text-left filter">
                <MDBBtn size="sm" circle className="btn-round result-tags" color="blue"
                    onClick={this.fetchPage.bind(this, false)} disabled={options.page < 2 ? true : null}
                >
                    <MDBIcon icon="angle-double-left" />
                </MDBBtn>
                <MDBBtn size="sm" circle className="btn-round result-tags" color="blue"
                    onClick={this.fetchPage.bind(this, true)}
                >
                    <MDBIcon icon="angle-double-right" />
                </MDBBtn>
                <MDBBadge color="default" className="text-capitalize result-tags">
                    Result Found: { resultCount }
                </MDBBadge>
                {
                    options && Object.keys(options).map(key => {
                        let pageNum = Math.ceil( options[key] / 10)
                        let optionValue = key === 'page' ? pageNum : options[key]
                    return <MDBBadge color="default" key className="text-capitalize result-tags">
                            {`${key} : ${optionValue}`}
                        </MDBBadge>
                    })
                }
            </div>
        )
    }
    getImageResultJSX() {
        const {imageList } = this.props
        return (
            <div>
                {this.getSelectedFilterTagsJSX()}
                <div className="image-result-div flex-container">
                    { imageList
                        && imageList.map( (result, index) => {
                            const { url, thumbnail, snippet } = result
                            return (    
                                    <GalleryImage
                                        key={index}
                                        imageThumbnail={thumbnail}
                                        imageUrl={url}
                                        imageTitle={snippet}
                                        imageId={index}
                                    />
                            )
                        })
                    }
                </div>
            </div>
        )
    }
    render() {
        const {imageList, imageListloading } = this.props
        return (
            <div className="container-fluid p-0">
                <MDBContainer className="p-0">
                    <MDBRow>
                        <MDBCol xl="12" lg="12" md="12">
                            <div className="pos-rel">
                                <label className="powered-text">Powered by Google Custom Search</label>
                            </div>
                            <MDBInput label="Search with meme tags" id="searchBox" containerClass="mr-1"
                                onKeyUp={this.handleSearch.bind(this)}
                                icon="search" iconClass="float-right pos-rel cursor-pointer" onIconClick={this.props.getImageList.bind(this)}
                            />
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <MDBContainer id="searchResults">
                    {
                        imageListloading
                        ?
                            <Loader icon={'spinner'} pulse={true} customClass="bg-none" iconClass="text-color-black"  />
                        :
                            imageList && imageList.length === 0
                            ?
                                this.noResultsJSX()
                            :
                                this.getImageResultJSX()
                    }
                </MDBContainer>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        imageList: state.reducerState.imageList,
        imageListloading: state.reducerState.imageListloading,
        resultCount: state.reducerState.resultCount,
        options: state.reducerState.options,
        useImageloading: state.reducerState.useImageloading,
        searchString: state.reducerState.searchString,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getImageList: () =>{
            dispatch(AppActions.getImageList())
        },
        updateSearchString: (searchString) => {
            dispatch(AppActions.updateSearchString(searchString))
        },
        updateSearchOptions: (options) => {
            dispatch(AppActions.updateSearchOptions(options))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleImageResult)