import React from 'react';
import ERR from '../images/ERR.png';

export default class ErrorHelp extends React.Component {
   state ={
     error: false,
     timeout: null
   }

   componentDidMount=() => {
     let timeout = window.setTimeout(this.errorMessage, 1000);
     this.setState({
       timeout
     });
   }

   componentWillMount = () => {
     window.clearTimeout(this.state.timeout);
   }

   errorMessage=() => {
     this.setState({
       error: true
     });
   }


   render =() => {
     return (
       <div>
        {
          this.state.error ? (
            <div>
              <img src={ERR} alt="" />
              <h1>Error loading map</h1>
              <p>The map could not be loaded, Please try again later</p>
            </div>
          )
          : (<div><h1>Loading</h1></div>)
        } </div>
     )
   }

}
