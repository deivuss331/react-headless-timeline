import styled from 'styled-components';

export const StyledCard = styled.div`
  padding: ${({ theme }) => theme.space[1]};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border-radius: ${({ theme }) => theme.radius.base};
  color: ${({ theme }) => theme.color.white};
  top: 50%;
  transform: translateY(-50%);
`;
