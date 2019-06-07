import React from 'react';
import { connect } from "react-redux";
import './App.css';
import {searchTermChanged, refreshImages } from "./store/actions";
import NavbarComponent from './components/NavBarComponent';
import Home from './components/Home';
import ImageGalleryComponent from './components/ImageGalleryComponent';

/*class App extends Component {
    render() {
        const { fetching, items, onRequestImages, error } = this.props;

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Welcome to Image Saga</h1>
                </header>


                {items ? (items):"none"}


                {fetching ? (
                    <button disabled>Fetching...</button>
                ) : (
                    <button onClick={onRequestImages}>Request Images</button>
                )}

                {error && <p style={{ color: "red" }}>Uh oh - something went wrong!</p>}

            </div>
        );
    }
}*/
const App = ({items,error,isLoading = false,onSearchTermChanged,handleRefresh}) => {
    return (<div className="container-fluid">
        <NavbarComponent title="Flickr Image Search" onSearch={onSearchTermChanged} onRefresh={handleRefresh}/>
        <Home error={error} isLoading={isLoading} handleRefresh={handleRefresh}/>
        {items && items.length ? <ImageGalleryComponent items={items}/> : ''}
    </div>)
}

const mapStateToProps = state => {
    return {
        isLoading: state.gallery.isLoading,
        items: state.gallery.items,
        error:state.gallery.error
    };
};

const mapDispatchToProps = {
    onSearchTermChanged: searchTermChanged,
    handleRefresh:refreshImages
};

/*const App = ({items,error,isLoading = false,onSearchTermChanged,handleRefresh}) => {
    return (<div className="container-fluid">
        <NavbarComponent title="Flickr Image Search" onSearch={onSearchTermChanged} onRefresh={handleRefresh}/>
        <Home error={error} isLoading={isLoading} handleRefresh={handleRefresh} />
        {items && items.length?<ImageGalleryComponent items={items} />:''}
    </div>)
}

const mapStateToProps = state => ({
    isLoading: state.gallery.isLoading,
    items: state.gallery.items,
    error:state.gallery.error
})

const mapDispatchToProps = {
    onSearchTermChanged: searchTermChanged,
    handleRefresh:refreshImages
}
*/
export default connect(mapStateToProps, mapDispatchToProps)(App);