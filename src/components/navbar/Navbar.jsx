import React, { Component } from 'react';
import styled from 'styled-components';
import ArrowIconMui from '@material-ui/icons/KeyboardArrowDown';
import { IconButton } from '@material-ui/core';
import { Server } from '../../settings';

const Wrapper = styled.div`
  width: 100%;
  height: 48px;
  max-height: 48px;
  background-color: white;
  display: grid;
  grid-template-columns: 25% 35% 40%;
  box-shadow: 0px 2px 4px 0px rgb(0, 0, 0, 0.10);
  position: fixed;
  top: 0px;
  left: 0px;
  overflow: hidden;
`;

const SettingsSection = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LogoSection = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 16px;
  & > img {
    margin-right: 8px;
  }
`;

const SearchSection = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.10rem;
  font-weight: 600;
  & #drugstore-name {
    font-style: italic;
    font-weight: 400;
  }
`;

const UserSection = styled.div`
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, #5639ac 0%, #7053c6 100%);
  position: relative;
  &::before {
    position: absolute;
    content: "";
    border-bottom: 24px solid white;
    border-left: 24px solid white;
    border-top: 24px solid transparent;
    border-right: 24px solid transparent;
  }
`;

const UserSectionWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 16px;
  margin-right: 24px;
`;

const LogoWrapper = styled.img`
  border-radius: 50%;
  width: 32px;
  height: 32px;
`;

const LogoText = styled.span`
  font-weight: 600;
  font-size: 1.05rem;
  font-family: 'Kodchasan', sans-serif;
`;

const UserInfo = styled.div`
  max-width: 320px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow: hidden;
  margin-right: 32px;
  & > img {
    margin-right: 8px;
  }
  & > span {
    margin-right: 8px;
  }
`;

const UserPhoto = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  box-shadow: 0px 0px 4px 0px rgb(0, 0, 0, 0.15);
`;

const UserName = styled.span`
  color: white;
  font-weight: 400;
  font-family: 'Kaushan Script', cursive;
  max-width: 280px;
  max-height: 48px;
  overflow-x: auto;
  overflow-y: hidden;
`;

const ArrowIcon = styled(ArrowIconMui)`
  color: white;
`;

const PossibleLongTextFormatter = (text) => {
  if (text && text.length > 30) {
    let cutted = text.substr(0, 25);
    cutted = cutted + "..."
    return  cutted;
  }
  return text;
}

class Navbar extends Component {

  toggleDrawer = () => {
    this.props.toggleDrawer();
  }

  getNameToShow = () => {
    const { user } = this.props;
    return (user.fullNameCopy && user.fullNameCopy.length > 1) ? user.fullNameCopy : user.fullName;
  }

  render() {
    const { user } = this.props;
    const userName = this.getNameToShow();

    return(
      <Wrapper>
        <LogoSection>
          <LogoWrapper src="logo_dark_bg.svg" alt="Bitpharma | Orders management" />
          <LogoText>Bit orders</LogoText>
        </LogoSection>
        <SearchSection>
           <span>{ (!!user && !!user.drugStore && !!user.drugStore.name) ? user.drugStore.name : 'Farmacia - '}</span>
        </SearchSection>
        <UserSection>
          <UserSectionWrapper>
            <UserInfo>
              <UserPhoto src={ (user.photoUrl && user.photoUrl.length > 1 ) ? `${Server}/${user.photoUrl}` : "no-photo.png"} alt={`Bitpharma user | ${user.fullName}`} />
              <UserName>
                {PossibleLongTextFormatter(userName)}
              </UserName>
              <IconButton onClick={this.toggleDrawer}>
                <ArrowIcon />
              </IconButton>
            </UserInfo>
          </UserSectionWrapper>
        </UserSection>
      </Wrapper>
    );
  }
}

export default Navbar;