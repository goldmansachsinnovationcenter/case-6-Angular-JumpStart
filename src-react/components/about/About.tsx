import React from 'react';
import styled from 'styled-components';

import { 
  ViewContainer, 
  Container, 
  Header, 
  Row, 
  ColMd2, 
  ColMd10 
} from '../../shared-components/Layout';

const InfoIcon = styled.span`
  margin-right: 8px;
`;

const About: React.FC = () => {
  return (
    <ViewContainer className="view">
      <Container>
        <Header>
          <h3>
            <InfoIcon className="glyphicon glyphicon-info-sign" />
            About
          </h3>
        </Header>
        <br />
        <Container>
          <Row>
            <ColMd2>Created by:</ColMd2>
            <ColMd10>
              <a href="http://twitter.com/DanWahlin" target="_blank" rel="noopener noreferrer">
                Dan Wahlin
              </a>
            </ColMd10>
          </Row>
          <Row>
            <ColMd2>Blog:</ColMd2>
            <ColMd10>
              <a href="http://blog.codewithdan.com" target="_blank" rel="noopener noreferrer">
                https://blog.codewithdan.com
              </a>
            </ColMd10>
          </Row>
          <Row>
            <ColMd2>GitHub:</ColMd2>
            <ColMd10>
              <a href="https://github.com/DanWahlin/Angular-JumpStart" target="_blank" rel="noopener noreferrer">
                https://github.com/DanWahlin/Angular-JumpStart
              </a>
            </ColMd10>
          </Row>
        </Container>
      </Container>
    </ViewContainer>
  );
};

export default About;
