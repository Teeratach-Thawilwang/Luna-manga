import styled from "styled-components";

export default function Leaf(props: any) {
  return (
    <Span {...props.attributes} style={getFontStyle(props.leaf)}>
      {props.children}
    </Span>
  );
}

const Span = styled.span`
  /* border: 1px solid red; */
`;

function getFontStyle(leafCase: any) {
  return {
    fontWeight: leafCase.bold ? "bold" : "normal",
    fontStyle: leafCase.italic ? "italic" : "normal",
    textDecoration: leafCase.underline ? "underline" : "none",
  };
}
