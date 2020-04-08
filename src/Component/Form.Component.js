import React from 'react';
import './Form.style.css';

const Form=props=>{
    return(
        
        <div className="Container">
              <div>{props.error ? error() :null}</div>
            <form onSubmit={props.loadweather}>
            <div className="row">
                <div className="col-md-3 offset-md-2">
      <input 
          type="text"
          className="form-control"
        name="city"
      autoComplete="off"
      placeholder="city"
   
        />
                </div>
             <div className="col-md-3">
                <input 
                type="text" 
                className="form-control" 
                name="country" 
                autoComplete="off"
                placeholder="country"
                />
           </div>
                <div className="col-md-3 mt-md-0  py-2 txt-md-left">
                    <button className="btn  btn-warning">
                        GET WEATHER
                        </button>

                </div>
                </div>
                </form>
        </div>
       
    );

};
const error = props => {
    return (
      <div className="alert alert-danger mx-5" role="alert">
        Please Enter City and Country...!
      </div>
    );
  };
export default Form;

