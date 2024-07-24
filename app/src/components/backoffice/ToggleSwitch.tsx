import styled from "styled-components";

interface ToggleSwitchProps {
  height: number;
  width: number;
  checked: boolean;
  onChange: () => void;
}

export default function ToggleSwitch({ height, width, checked, onChange }: ToggleSwitchProps) {
  return (
    <Switch height={height} width={width}>
      <HiddenCheckbox type="checkbox" checked={checked} onChange={onChange} />
      <Slider height={height} width={width} checked={checked} />
    </Switch>
  );
}

const Switch = styled.label<{ height: number; width: number }>`
  position: relative;
  display: inline-block;
  width: ${(props) => String(props.width) + "px"};
  height: ${(props) => String(props.height) + "px"};
`;

const Slider = styled.span<{ height: number; width: number; checked: boolean }>`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${(props) => (props.checked ? "#44b642" : "#ccc")};
  transition: 0.4s;
  border-radius: 100px;

  &:before {
    position: absolute;
    content: "";
    height: ${(props) => String(props.height - 4) + "px"};
    width: ${(props) => String(props.height - 4) + "px"};
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
    transform: ${(props) => (props.checked ? "translateX(" + (props.width - props.height) + "px)" : "translateX(0)")};
  }
`;

const HiddenCheckbox = styled.input`
  display: none;
`;
