import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  height: calc(100vh - 48px);
  display: grid;
  grid-template-rows: 40% 60%;

`;

const SearchBarWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #5639ac 120%, #7053c6 100%);
  box-shadow: 0px 0px 8px 0px rgb(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Search = styled.input`
  width: 100%;
  padding: 8px;
  box-shadow: 0px 0px 8px 0px rgb(0, 0, 0, 0.2);
  border: none;
  &:focus {
    box-shadow: 0px 0px 8px 0px rgb(0, 0, 0, 0.2);
  }
`;

const Title = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 24px;
  margin-top: 32px;
  & > h3 {
    font-size: 0.13em;
    color: white;
    animation: appears 0.4s ease-in-out;
    animation-fill-mode: forwards;
  }

  @keyframes appears {
    0% {
      font-size: 0.13em;
      opacity: 0;
    }
    100% {
      font-size: 2.0em;
      opacity: 1;
    }
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 30% 2% 68%;
  margin-top: 16px;
`;

const Sidebar = styled.div`
  width: 100%;
  height: 70%;
  overflow: scroll;
  background-color: rgb(255, 255, 255, 0.85);
`;

const Indicator = styled.div`
  width: 100%;
  height: 100%;
  transition: 0.2s;
`;

const MenuOption = styled.div`
  width: 100%;
  height: 48px;
  margin-top: 12px;
  margin-bottom: 12px;
  background-color: #f2f2f2;
  color: ${props => props.active ? '#5639ac' : '#b3b3b3'};
  display: grid;
  grid-template-columns: 99% 1%;
  cursor: pointer;
  box-shadow: 0px 0px 8px 0px rgb(0, 0, 0, 0.05);
  &:last-child {
    margin-bottom: 0px;
  }
  &:first-child {
    margin-top: 0px;
  }
  & > ${Indicator} {
    background-color: ${props => props.active ? '#5639ac' : '#ccc'};
  }
  &:hover {
    box-shadow: 0px 0px 8px 4px rgb(0, 0, 0, 0.1);
    ${Indicator} {
      background-color: ${props => !props.active ? '#7053c6' : '#5639ac'};
    }
  }
`;

const Results = styled.div`
  width: 100%;
  background-color: white;
  display: grid;
  grid-template-rows: 20% 80%;
  box-shadow: 0px 0px 8px 0px rgb(0, 0, 0, 0.05);
  border-radius: 4px;
`;

const ResultTitle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  & > h1 {
    font-size: 2.3em;
  }
`;

const ResultContent = styled.div`
  width: 100%;
  height: 100%;
  text-align: justify;
  padding: 24px;
  $ > span {
    font-size: 1.08em;
  }
`;

class HelpPage extends Component {
  state = {
    data: [
      {
        id: 1,
        active: true,
        title: "Option #1",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu elementum urna. Donec vitae massa non mi consectetur tempor a vitae enim. Nunc eleifend sem turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec lobortis, ex quis tempor maximus, massa nibh mattis ipsum, sed vehicula dui ante et dui. Sed quis egestas erat. Sed suscipit ante ante, id consectetur mauris pulvinar sit amet. Proin placerat varius malesuada. Donec auctor ullamcorper urna, ut posuere ipsum posuere nec. Vestibulum bibendum, magna vitae volutpat scelerisque, ex nulla fringilla purus, non pharetra mi orci nec sem. Cras auctor diam et tristique pulvinar."
      },
      {
        id: 2,
        active: false,
        title: "Option #2",
        text: "Proin euismod libero vel dictum aliquet. Vivamus blandit, lorem id fermentum cursus, nulla sapien vehicula erat, et lacinia arcu dui at nunc. Curabitur consectetur blandit ligula, rutrum porta ligula venenatis id. Curabitur cursus velit mauris, sit amet rhoncus dolor dictum sit amet. Integer pretium arcu a tortor bibendum scelerisque. Duis elementum ut lectus nec bibendum. Cras a diam eu erat venenatis vestibulum eu at nisi. Nulla vitae ultricies felis, ac vulputate arcu. Proin scelerisque nunc id cursus elementum. Phasellus varius felis non tincidunt suscipit. Pellentesque eget rhoncus purus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis at pretium diam, eu iaculis erat. Proin viverra sem nec pharetra fringilla. Aliquam pellentesque pulvinar ex, ac blandit sem finibus condimentum. Integer fermentum scelerisque ornare."
      },
      {
        id: 3,
        active: false,
        title: "Option #3",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu elementum urna. Donec vitae massa non mi consectetur tempor a vitae enim. Nunc eleifend sem turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec lobortis, ex quis tempor maximus, massa nibh mattis ipsum, sed vehicula dui ante et dui. Sed quis egestas erat. Sed suscipit ante ante, id consectetur mauris pulvinar sit amet. Proin placerat varius malesuada. Donec auctor ullamcorper urna, ut posuere ipsum posuere nec. Vestibulum bibendum, magna vitae volutpat scelerisque, ex nulla fringilla purus, non pharetra mi orci nec sem. Cras auctor diam et tristique pulvinar."
      },
      {
        id: 4,
        active: false,
        title: "Option #4",
        text: "Proin euismod libero vel dictum aliquet. Vivamus blandit, lorem id fermentum cursus, nulla sapien vehicula erat, et lacinia arcu dui at nunc. Curabitur consectetur blandit ligula, rutrum porta ligula venenatis id. Curabitur cursus velit mauris, sit amet rhoncus dolor dictum sit amet. Integer pretium arcu a tortor bibendum scelerisque. Duis elementum ut lectus nec bibendum. Cras a diam eu erat venenatis vestibulum eu at nisi. Nulla vitae ultricies felis, ac vulputate arcu. Proin scelerisque nunc id cursus elementum. Phasellus varius felis non tincidunt suscipit. Pellentesque eget rhoncus purus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis at pretium diam, eu iaculis erat. Proin viverra sem nec pharetra fringilla. Aliquam pellentesque pulvinar ex, ac blandit sem finibus condimentum. Integer fermentum scelerisque ornare."
      },
      {
        id: 5,
        active: false,
        title: "Option #5",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu elementum urna. Donec vitae massa non mi consectetur tempor a vitae enim. Nunc eleifend sem turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec lobortis, ex quis tempor maximus, massa nibh mattis ipsum, sed vehicula dui ante et dui. Sed quis egestas erat. Sed suscipit ante ante, id consectetur mauris pulvinar sit amet. Proin placerat varius malesuada. Donec auctor ullamcorper urna, ut posuere ipsum posuere nec. Vestibulum bibendum, magna vitae volutpat scelerisque, ex nulla fringilla purus, non pharetra mi orci nec sem. Cras auctor diam et tristique pulvinar."
      },
      {
        id: 6,
        active: false,
        title: "Option #6",
        text: "Proin euismod libero vel dictum aliquet. Vivamus blandit, lorem id fermentum cursus, nulla sapien vehicula erat, et lacinia arcu dui at nunc. Curabitur consectetur blandit ligula, rutrum porta ligula venenatis id. Curabitur cursus velit mauris, sit amet rhoncus dolor dictum sit amet. Integer pretium arcu a tortor bibendum scelerisque. Duis elementum ut lectus nec bibendum. Cras a diam eu erat venenatis vestibulum eu at nisi. Nulla vitae ultricies felis, ac vulputate arcu. Proin scelerisque nunc id cursus elementum. Phasellus varius felis non tincidunt suscipit. Pellentesque eget rhoncus purus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis at pretium diam, eu iaculis erat. Proin viverra sem nec pharetra fringilla. Aliquam pellentesque pulvinar ex, ac blandit sem finibus condimentum. Integer fermentum scelerisque ornare."
      }
    ],
    activeIndex: 0
  }
  changeActiveOption = (id) => {
    let changedData = [...this.state.data];
    let activeIndex = 0;
    changedData.forEach(item => {
      if (item.id !== id) {
        item.active = false;
      } else {
        item.active = true;
        activeIndex = this.state.data.indexOf(item);
      }
    });

    this.setState({
      data: changedData,
      activeIndex: activeIndex,
    });
  }
  render() {
    const { data, activeIndex } = this.state;
    return(
      <Wrapper>
        <SearchBarWrapper>
          <div style={{ width: '80%' }}>
            <Title>
              <h3>Help & support</h3>
            </Title>
            <Search type="text" placeholder="Search..." />
          </div>
        </SearchBarWrapper>
        {
          data.length > 0 ? (
            <ContentWrapper>
              <Sidebar>
                {
                  data.map(item => (
                    <MenuOption key={item.id} active={item.active} onClick={() => this.changeActiveOption(item.id)}>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {item.title}
                      </div>
                      <Indicator />
                    </MenuOption>
                  ))
                }
              </Sidebar>
              <div></div>
              <Results>
                <ResultTitle>
                  <h1>{ data[activeIndex].title }</h1>
                </ResultTitle>
                <ResultContent>
                  <p>
                    { data[activeIndex].text }
                  </p>
                </ResultContent>
              </Results>
            </ContentWrapper>
          ) : null
        }
      </Wrapper>
    );
  }
}

export default HelpPage;