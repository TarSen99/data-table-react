import React from 'react';

const WithContext = (Context, Component) => {
  return (props) => {
    return (
      <Context.Consumer>
        {
          data => {
            return <Component {...props} {...data} />
          }
        }
      </Context.Consumer>
    );
  }
};

export default WithContext;