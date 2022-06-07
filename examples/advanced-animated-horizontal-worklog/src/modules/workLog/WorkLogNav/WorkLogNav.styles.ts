import styled from 'styled-components';

export const StyledNav = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`;
