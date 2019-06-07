import React from 'react';
import styled from 'styled-components';
import CloseIconMui from '@material-ui/icons/Close';
import ReactToPrint from 'react-to-print';
import { Server } from '../../../settings';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 4fr 1fr;
  grid-template-columns: auto;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Body = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #7053c6;
  color: white;
`;

const LeftContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const CenterContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const UserPhotoWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  padding: 24px;
`;

const UserImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
`;

const Username = styled.div`
  & > span {
    font-weight: 600;
    font-size: 1.08rem;
  }
  margin-top: 24px;
`;

const Title = styled.div`
  & > span {
    font-weight: 400;
    font-size: 1.22rem;
  }
`;

const PossibleLongTextFormatter = (text) => {
  if (text.length > 22) {
    let cutted = text.substr(0, 22);
    cutted = cutted + "..."
    return  cutted;
  }
  return text;
}

const AddressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: auto;
  padding: 16px;
`;

const AddressTitle = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  & > span {
    font-weight: 600;
    font-size: 1.18rem;
  }
`;

const Address = styled.div`
  width: 100%;
  height: auto;
  padding: 16px;
  text-align: center;
`;

const CloseIconWrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  & > svg {
    font-size: 2.0rem;
  }
`;

const CloseIcon = styled(CloseIconMui)`
  font-size: 1.8rem;
`;

const PrintButton = styled.button`
  padding: 14px;
  background-color: #7053c6;
  color: white;
  border: solid 1px white;
  box-shadow: none;
  border-radius: 8px;
  font-size: 1.16rem;
  font-weight: 400;
  min-width: 120px;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: white;
    color: #7053c6;
  }
`;

const MainSection = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: auto;
`;

class OrderInfoContent extends React.Component {

  printInfo = () => {

  }

  render() {
    const { orderInfo } = this.props;
    const user = orderInfo.user;
    const order = orderInfo.data;
    const useImgUrl = 'https://britz.mcmaster.ca/images/nouserimage.gif/image';

    return (
      <>
        <Wrapper>
          <CloseIconWrapper onClick={this.props.handleClose}>
            <CloseIcon />
          </CloseIconWrapper>
          <MainSection ref={el => (this.orderInfoComponent = el)}>
            <Header>
              <UserPhotoWrapper>
                <UserImage alt={user.email} src={user.profile_picture_url? `${Server}/${user.profile_picture_url}` : useImgUrl} />
                <Username>
                  <span>
                    { PossibleLongTextFormatter(user.complete_name) }
                  </span>
                </Username>
              </UserPhotoWrapper>
            </Header>
            <Body>
              <AddressWrapper>
                <AddressTitle>
                  <span>
                    Deliver to
                  </span>
                </AddressTitle>
                <Address>
                  <span>
                    { user.address }
                  </span>
                </Address>
              </AddressWrapper>
            </Body>
          </MainSection>
          <Footer>
            <ReactToPrint
              trigger={() => <PrintButton onClick={this.printInfo}>Print</PrintButton>}
              content={() => this.orderInfoComponent}
            />
          </Footer>
        </Wrapper>
      </>
      
    );
  }
}

export default OrderInfoContent;
