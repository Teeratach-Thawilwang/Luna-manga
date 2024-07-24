import { styled } from "styled-components";

import { color } from "@utils/Themes";

export default function NotFound404() {
  return (
    <Box>
      <Header>404</Header>
      <Title>Page Not Found</Title>
      <Text>Sorry, the page you are looking for does not exist. Please check the URL and try again.</Text>
    </Box>
  );
}

const Box = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  height: 100dvh;
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  text-align: center;
`;

const Header = styled.h1`
  font-size: 10rem;
  margin: 0;

  color: ${(props) => color(props).error};

  @media (max-width: 768px) {
    font-size: 8rem;
  }

  @media (max-width: 480px) {
    font-size: 6rem;
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 0;
  color: ${(props) => color(props).primary};

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Text = styled.p`
  font-size: 1.2rem;
  color: ${(props) => color(props).onSurfaceVariant};

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;
