import React from 'react';
import { APIContext } from './API';

const withAPI = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <APIContext.Consumer>
          {
            contextValue => <WrappedComponent API={contextValue} {...this.props}  />
          }
        </APIContext.Consumer>
      );
    }
  }
}

export default withAPI;