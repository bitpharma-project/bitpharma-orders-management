import React from 'react';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';

const ModalWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  background-color: white;
  box-shadow: 0px 0px 8px 0px rgb(0, 0, 0, 0.16);
  width: ${props => props.width};
  height: ${props => props.height};
  position: relative;
  top: 8%;
  margin: 0 auto;
`;

const ResponsiveWrapper = styled.div`
  width: 24%;
  height: 60%;
  background-color: white;
  box-shadow: 0px 0px 8px 0px rgb(0, 0, 0, 0.16);
  position: relative;
  top: 8%;
  margin: 0 auto;
  @media only screen and (max-width: 980px) {
    width: 60%;
    height: 60%;
  }
  @media only screen and (max-width: 768px) {
    width: 70%;
    height: 60%;
    top: 3%;
  }
  @media only screen and (max-width: 480px) {
    width: 100%;
    height: 100%;
    top: 0%;
  }
`;

class BitModal extends React.Component {
  render() {
    return (
      <>
        <Modal
          aria-labelledby={this.props.title}
          aria-describedby={this.props.description}
          open={this.props.open}
          onClose={this.props.handleClose}
        >
          <ResponsiveWrapper>
            {
              this.props.children
            }
          </ResponsiveWrapper>
        </Modal>
      </>
    );
  }
}

export default BitModal;
