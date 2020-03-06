import React, { Component } from 'react'
import { MDBInput, MDBContainer, MDBRow, MDBCol, MDBBadge } from 'mdbreact'
import { connect } from 'react-redux';
import store from '../reduxStore'
import { AppActions } from '../actions';
import Loader from './Loader'
import GalleryImage from './GalleryImage';
// import PaginationComponent from './PaginationComponent';


class GoogleImageResult extends Component {

    componentDidMount() {
    }

    handleSearch = async(event) => {
        let searchString = event.target.value, isSearch = false
        if (searchString) { 
            var code = (event.keyCode ? event.keyCode : event.which);
            isSearch = code === 13            
        } else {
            searchString = document.getElementById('searchBox').value
            isSearch = searchString ? !!searchString.trim() : false
        }
        //call search api
        if (isSearch) {
            const options = {} // fetch options
            store.dispatch(AppActions.getImageList(searchString, options))
        }
    }
    noResultsJSX() {
        return (
            <div className="no-image-result">
                <MDBBadge color="light">
                    Result Found: 0
                </MDBBadge>
                <span>&nbsp; Try different search tags</span>
            </div>
        )
    }
    getSelectedFilterTagsJSX() {
        const { options, resultCount} = this.props
        return (
            <div className="text-left filter">
                <MDBBadge color="default" className="text-capitalize">
                    Result Found: { resultCount }
                </MDBBadge>
                {
                    options && Object.keys(options).map(key => {
                    return <MDBBadge color="default" key className="text-capitalize">
                            {`${key} : ${options[key]}`}
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
                                <label className="powered-text">Powered by Google Search</label>
                            </div>
                            <MDBInput label="Search with meme tags" id="searchBox" onKeyDown={this.handleSearch.bind(this)}
                                icon="search" iconClass="float-right pos-rel cursor-pointer" onIconClick={this.handleSearch.bind(this)}
                            />
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <MDBContainer id="searchResults">
                    {
                        imageListloading
                        ?
                            <Loader icon={'spinner'} pulse={true}  />
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getImageList: (options) =>{
            dispatch(AppActions.getImageList(options))
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps )(GoogleImageResult)