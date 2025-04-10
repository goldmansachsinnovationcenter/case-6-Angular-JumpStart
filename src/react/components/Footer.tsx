import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f8f9fa;
  border-top: 1px solid #e9ecef;
  padding: 20px;
  text-align: center;
  margin-top: 50px;
`;

const Copyright = styled.p`
  margin: 0;
  color: #6c757d;
  font-size: 14px;
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <FooterContainer data-testid="app-footer">
      <Copyright>
        &copy; {currentYear} Angular JumpStart (React Version)
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
