
import  Modal  from 'components/Modal/Modal';
import {Appstyle} from './App.styled'
import axios from 'axios';
import { Searchbar } from "./Searchbar/Searchbar";
import React, { Component } from "react";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { fetchGallery } from './Api';
axios.defaults.baseURL = "https://pixabay.com/api"
export class App extends Component {
  state = {
    name: '',
    images: [],
    page: 1,
    loading: 'idle',
    error: null,
    selectedImage: null,
    alt: null,
    showModal:false,
  };
  totalHits = null;

  
  
  async componentDidUpdate(_, prevState) {
    const { page, name } = this.state;
    if (prevState.name !== name || prevState.page !== page) {
      this.setState({ loading: 'pending' });
      
      try {
        const imageData = await fetchGallery(page, name);
        this.totalHits = imageData.total;
        const imagesHits = imageData.hits;
        if (!imagesHits.length) {
          alert('No results were found.');
        }
        this.setState(({ images }) => ({
          images: [...images, ...imagesHits],
          loading: 'resolved',
        }));
        
        if (page > 1) {
          const CARD_HEIGHT = 300;
          window.scrollBy({
            top: CARD_HEIGHT * 2,
            behavior: 'smooth',
          });
        }
      } catch (error) {
        alert({ error });
        this.setState({ loading: 'rejected' });
      }
    }
  }
  reset = () => {
    this.setState({
      name: '',
      page: 1,
      images: [],
      selectedImage: null,
      alt: null,
      loading: 'idle',
      showModal:false,
    });
  };
  onFormSubmit = name => {
    if (this.state.name === name) {
      return;
    }
    
    this.setState({ name });
  };

  onModalClose = () => {
    this.setState({
      selectedImage: null,
      showModal: false,
    });
    
  };
  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  onSelectedImage = (largeImageUrl, tags) => {
    this.setState({
      selectedImage: largeImageUrl,
      alt: tags,
      showModal: true,
    });
   
    
  };

  render() {
    const { images, error, loading, selectedImage, alt } = this.state;
    return (
      <Appstyle>
        <Searchbar onSubmit={this.onFormSubmit} />
        {loading === 'pending' && <Loader />}

        {images.length > 0 && (
          <ImageGallery selectedImage={this.onSelectedImage} images={images} />
        )}
        {images.length > 0 && images.length !== this.totalHits && (
          <Button onLoadMore={this.onLoadMore} />
        )}
        {error && <h1>{error.message}</h1>}
        {selectedImage && (
          <Modal
            onModalClose={this.onModalClose}
            selectedImage={selectedImage}
            tags={alt}
          />
        )}
      </Appstyle>
    );
  }
};
