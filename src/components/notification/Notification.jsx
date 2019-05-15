import React, { Component } from 'react';
import styled from 'styled-components';
import CloseIconMui from '@material-ui/icons/Close';

const Wrapper = styled.div`
  width: 100%;
  background-color: rgb(0,0,0,0.65);
  display: flex;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
  height: 120px;
  position: absolute;
  bottom: 0px;
`;

const CloseIcon = styled(CloseIconMui)`
  color: white;
`;

const TextArea = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-width: 320px;
  max-width: 880px;
  & > span {
    color: white;
  }
`;

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: true,
    }
  }
  render() {
    return(
      <Wrapper>
        <TextArea>
          <span>My notification text here...</span>
        </TextArea>
        <CloseIcon />
      </Wrapper>
    );
  }
}

export default Notification;