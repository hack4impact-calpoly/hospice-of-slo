import styled from 'styled-components';

const StyledHeading = styled.h2`
  text-align: center;
  padding: 32px 0 10px;
  margin: 0 85px;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    font-size: 1.3rem;  
    padding: 40px 0 10px;
  }

  @media screen and (max-width: 350px) {
    font-size: 1.2rem;
  }
`;

export default StyledHeading;
