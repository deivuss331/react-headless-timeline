import styled from 'styled-components';

export default styled.h2`
  font-weight: ${({ theme }) => theme.fontWeight.h2};
  font-size: ${({ theme }) => theme.fontSize.h2};
  line-height: ${({ theme }) => theme.lineHeight.h2};
`;
