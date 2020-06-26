import React, { Fragment, useContext } from "react";
import { Helmet } from "react-helmet";
import { Layout } from "antd";
import styled from "styled-components";
import { HomePage } from "components";
import { Footer } from "components/Footer";
import Navigation from "../../components/Navigation/Navigation";
import { CurrentUserContext } from "../../contexts/Store";

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const App = () => {
  const { Header, Content } = Layout;
  const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

  return (
    <Fragment>
      <Helmet defaultTitle="Tellor">
        <meta name="description" content="Travels project"/>
      </Helmet>
      <StyledLayout>
        <Header>
          <Navigation currentUser={currentUser} setCurrentUser={setCurrentUser}/>
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
