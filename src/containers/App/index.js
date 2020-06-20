import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Layout } from "antd";
import styled from "styled-components";
import { HomePage } from "components";
import { Footer } from "components/Footer";
import Navigation from "../../components/Navigation/Navigation";

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const App = () => {
  const { Header, Content } = Layout;

  return (
    <Fragment>
      <Helmet defaultTitle="Tellor">
        <meta name="description" content="Travels project"/>
      </Helmet>
      <StyledLayout>
        <Header>
          <Navigation/>
        </Header>
        <Content>
          <HomePage/>
        </Content>
        <Footer/>
      </StyledLayout>
    </Fragment>
  );
};

export default App;
