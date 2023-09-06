import { Loader } from "./Loader/Loader";
import { Modal } from 'components/Modal/Modal';
import {Appstyle} from './App.styled'
import { Searchbar } from "./Searchbar/Searchbar";
import React, { Component } from "react";


export class App extends Component {
  state = {
    
  }

  onClick = () => {
    
    
  }
  render(){
     return (
       <Appstyle>
         <Searchbar onClick={this.onClick} />
         <Loader />
         <Modal />
       </Appstyle>
     );
  }
   
    

};
