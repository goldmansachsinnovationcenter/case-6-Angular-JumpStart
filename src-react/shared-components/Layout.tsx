import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  
  @media (min-width: 576px) {
    max-width: 540px;
  }
  
  @media (min-width: 768px) {
    max-width: 720px;
  }
  
  @media (min-width: 992px) {
    max-width: 960px;
  }
  
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  margin-bottom: 1rem;
`;

export const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  
  div {
    padding-left: 0px;
  }
`;

export const Column = styled.div`
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
`;

export const ColMd2 = styled(Column)`
  @media (min-width: 768px) {
    flex: 0 0 16.666667%;
    max-width: 16.666667%;
  }
`;

export const ColMd10 = styled(Column)`
  @media (min-width: 768px) {
    flex: 0 0 83.333333%;
    max-width: 83.333333%;
  }
`;

export const ColMd12 = styled(Column)`
  @media (min-width: 768px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

export const ViewContainer = styled.div`
  padding: 20px;
`;

export const Header = styled.header`
  margin-bottom: 1rem;
`;

export const MapContainer = styled.div`
  margin-top: 20px;
`;
