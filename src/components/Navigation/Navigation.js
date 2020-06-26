import React, { Component } from "react";
import { BulbOutlined, RightCircleOutlined } from "@ant-design/icons";
import TellorLogoDark from "../../assets/Tellor__Logo--Dark.png";
import TellorLogoLight from "../../assets/Tellor__Logo--Light.png";
import styled from "styled-components";
import { Web3SignIn } from "../shared/Web3SignIn";

const StyledHeader = styled.div`
  display: flex;
  width: 100%;
  padding-top: 15px;
  padding-bottom: 15px;
`;

const StyledBrandLink = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  img {
    height: 60px;
    width: auto;
    display: inline-block;
  }
  span {
    color: #5cfcb6;
    font-size: 21px;
    font-weight: 300;
    margin-bottom: -11px;
    font-weight: 500;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    span {
      display: none;
    }
  }
`;

const StyledHeaderNav = styled.div`
  display: inline-block;
  margin-left: auto;
  > button {
    padding: 0px 15px !important;
  }
  > * {
    margin-left: 25px;
    font-size: 1.5em;
    color: var(--color-link);
    // &:last-child {
    //   border: 2px solid #5cfcb6;
    //   color: #5cfcb6;
    //   border-radius: 50px;
    //   padding: 10px 15px;
    //   vertical-align: middle;
    // }

    @media (max-width: 800px) {
      font-size: 1em;
      margin-left: 15px;
    }
  }
`;

const darkThemePropertiesMap = {
  background: '#000',
  'background-2': '#252525',
  'color-primary-1': '#5cfcb6',
  'color-primary-2': '#baffe1',
  'color-primary-3': '#99ffd1',
  'color-primary-4': '#37f3a1',
  'color-primary-5': '#00ff8f',
  'color-secondary-1': '#777777',
  'color-secondary-2': '#444444',
  'color-table-thead': '00ff8f',
  'color-heading': '#00ff8f',
  'color-link': '#5cfcb6',
  'modal-color-background': '#444444',
  'modal-color-btn-default': '#5cfcb6',
}

const lightThemePropertiesMap = {
  background: '#fff',
  'background-2': '#fff',
  'color-primary-1': '#5cfcb6',
  'color-primary-2': '#252525',
  'color-primary-3': '#99ffd1',
  'color-primary-4': '#37f3a1',
  'color-primary-5': '#00ff8f',
  'color-secondary-1': '#777777',
  'color-secondary-2': '#444444',
  'color-table-thead': '#000',
  'color-heading': '#000',
  'color-link': '#000',
  'modal-color-background': '#fff',
  'modal-color-btn-default': '#000',
}

export default class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      theme: 'dark',
      logo: TellorLogoDark,
      themePropertiesMap: darkThemePropertiesMap,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    for (const property in this.state.themePropertiesMap) {
      if (this.state.themePropertiesMap[property]) {
        this.setThemeProperty(property, this.state.themePropertiesMap[property]);
      }
    }
  }

  switchTheme() {
    const isDarkTheme = this.state.theme === 'dark';

    this.setState({
      theme: isDarkTheme ? 'light' : 'dark',
      logo: isDarkTheme ? TellorLogoLight : TellorLogoDark,
      themePropertiesMap: isDarkTheme ? lightThemePropertiesMap : darkThemePropertiesMap,
    });
  };

  setThemeProperty(name, value) {
    document.documentElement.style.setProperty(`--${name}`, value);
  };

  truncateAddr(addr) {
    return addr.slice(0, 6) + '...';
  };

  render() {
    return (
      <StyledHeader>
        <StyledBrandLink>
          <img src={this.state.logo} alt="tellor"/>
          <span>data</span>
        </StyledBrandLink>
        <StyledHeaderNav>
          <BulbOutlined onClick={() => {
            this.switchTheme()
          }}/>
          <a
            href="https://disputes.tellorscan.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Dispute Center <RightCircleOutlined/>
          </a>
          {!this.props.currentUser ? (
            <Web3SignIn setCurrentUser={this.props.setCurrentUser} />
          ) : (
            <span>{this.truncateAddr(this.props.currentUser.username)}</span>
          )}
        </StyledHeaderNav>
      </StyledHeader>
    );
  }
}
