import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
//import NewUser from './components/Views/NewUser'
import Biodata from './components/Views/Biodata'

import {Container} from 'reactstrap'



class App extends Component {
  
  
  render(){
    return (
      
      
      <div>
        
        <Container className="bg-danger">
        <Biodata/>
        

  
        </Container>       
      </div>
      
    );

  }
  
}

export default App;
