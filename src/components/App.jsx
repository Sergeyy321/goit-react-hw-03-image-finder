
import  Modal  from 'components/Modal/Modal';
import {Appstyle} from './App.styled'
import axios from 'axios';
import { Searchbar } from "./Searchbar/Searchbar";
import React, { Component } from "react";
import * as basicLightbox from 'basiclightbox';
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
    totalHits: null,
    error: null,
    selectedImage: null,
    alt: null,
  };
  totalHits = null;

  reset = () => {
    this.setState({
      name: '',
      page: 1,
      images: [],
      selectedImage: null,
      alt: null,
      loading: 'idle',
    });
  };
  onFormSubmit = name => {
    if (this.state.name === name) {
      return;
    }
    this.reset();
    this.setState({ name });
  };

  onModalClose = () => {
    this.setState({
      selectedImage: null,
    });
  };

  // const image = await fetchGallery(page, name);
  // const hits = this.image.hits
  //    this.setState(({ images }) => ({
  //         images: [...images, ...imagesHits],
  //         status: 'resolved',
  //       }));
  // async componentDidMount() {
  //   const response = await axios.get(
  //     `https://pixabay.com/api/?q=${this.state.name}&page=${this.state.page}&key=33447079-0ba3d1fd30cda0252aa7b7ada&image_type=photo&orientation=horizontal&per_page=12`
  //   );
  //   this.setState({ images: response.data.hits });
  // }

  // componentDidUpdate() {
  //   fetch(
  //     `https://pixabay.com/api/?q=${this.props.name}&page=${this.state.page}&key=33447079-0ba3d1fd30cda0252aa7b7ada&image_type=photo&orientation=horizontal&per_page=12`
  //   )
  //     .then(res => res.json())
  //     .then(result => {
  //       this.setState({
  //         name: '',
  //         images: result,
  //         page: 1,
  //         loading: false,
  //         status: 'idle',
  //         error: null,
  //       });
  //     });
  // }
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
  onLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { name, images, error, loading, status } = this.state;
    return (
      <Appstyle>
        <Searchbar onSubmit={this.onFormSubmit} />
        {loading === 'pending' && <Loader />}
        <Modal onModalClick={this.onModalClick} />
        <ImageGallery name={name} images={images} />
        {images.length > 0 && images.length !== this.totalHits && (
          <Button onLoadMore={this.onLoadMore} />
        )}
        {error && (
          <h1 style={{ color: 'orangered', textAlign: 'center' }}>
            {error.message}
          </h1>
        )}
      </Appstyle>
    );
  }
};
