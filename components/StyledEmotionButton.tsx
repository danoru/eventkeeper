import styled from "@emotion/styled"
import { FC } from "react";

const StyledButton = styled.button`
  padding: 32px;
  backgroundColor: hotpink;
  fontSize: 24px;
  borderRadius: 4px;
  &:hover {
    color: white;
  },
`;

const StyledEmotionButton: FC = () => {
  return <StyledButton>Hover to change color.</StyledButton>;
};

export default StyledEmotionButton;