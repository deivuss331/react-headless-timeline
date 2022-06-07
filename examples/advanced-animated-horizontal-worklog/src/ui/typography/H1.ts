import styled from 'styled-components';

export default styled.h1`
  font-weight: ${({ theme }) => theme.fontWeight.h1};
  font-size: ${({ theme }) => theme.fontSize.h1};
  line-height: ${({ theme }) => theme.lineHeight.h1};
`;
