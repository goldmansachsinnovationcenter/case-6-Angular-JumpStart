import React from 'react';
import styled from 'styled-components';
import Card from '../shared/Card';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Content = styled.div`
  line-height: 1.6;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  margin-bottom: 15px;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const List = styled.ul`
  margin-left: 20px;
  margin-bottom: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 8px;
`;

const AboutContainer: React.FC = () => {
  return (
    <Container data-testid="about-container">
      <Card title="About Angular JumpStart">
        <Content>
          <Section>
            <SectionTitle>Overview</SectionTitle>
            <p>
              Angular JumpStart is a comprehensive sample application demonstrating Angular best practices and common patterns. 
              It's designed as both a learning resource for Angular developers and a starting point for new Angular projects.
            </p>
            <p>
              This application has been converted to React while maintaining the same functionality and user experience.
            </p>
          </Section>
          
          <Section>
            <SectionTitle>Features</SectionTitle>
            <List>
              <ListItem>Customer management with different view modes (card, grid, map)</ListItem>
              <ListItem>Order tracking and management</ListItem>
              <ListItem>Authentication and authorization</ListItem>
              <ListItem>Responsive design for various screen sizes</ListItem>
              <ListItem>Filtering and sorting capabilities</ListItem>
              <ListItem>Pagination for large data sets</ListItem>
            </List>
          </Section>
          
          <Section>
            <SectionTitle>Technologies Used</SectionTitle>
            <List>
              <ListItem>React for UI components</ListItem>
              <ListItem>TanStack Router for routing</ListItem>
              <ListItem>React Query for data fetching</ListItem>
              <ListItem>Styled Components for styling</ListItem>
              <ListItem>Material-UI for UI components</ListItem>
              <ListItem>TypeScript for type safety</ListItem>
            </List>
          </Section>
          
          <Section>
            <SectionTitle>Credits</SectionTitle>
            <p>
              Original Angular JumpStart application created by Dan Wahlin.
              React conversion implemented as part of the Goldman Sachs Innovation Center project.
            </p>
          </Section>
        </Content>
      </Card>
    </Container>
  );
};

export default AboutContainer;
