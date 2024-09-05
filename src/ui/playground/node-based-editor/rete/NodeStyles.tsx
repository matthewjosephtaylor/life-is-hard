import styled, { css } from "styled-components";
import type { ReteNodeExtraData } from "./ReteNodeExtraData";
import { $nodewidth, $socketmargin, $socketsize } from "./ReteNodeExtraData";

// width: ${(props) => Number.isFinite(props.width) ? `${props.width}px` : `${$nodewidth}px`};
// height: ${(props) => Number.isFinite(props.height) ? `${props.height}px` : "auto"};

// width: 10ch;
// height: 5em;
export const NodeStyles = styled.div<
  ReteNodeExtraData & { selected: boolean; styles?: (props: any) => any }
>`
  // background: black;
  // border: 1px solid grey;
  cursor: pointer;
  box-sizing: border-box;
  padding-bottom: 6px;
  position: relative;
  user-select: none;
  &:hover {
    background: #333;
  }
  ${(props) =>
    props.selected &&
    css`
      border-color: red;
    `}
  .title {
    color: white;
    font-family: sans-serif;
    font-size: 18px;
    padding: 8px;
  }
  .output {
    text-align: right;
  }
  .input {
    text-align: left;
  }
  .output-socket {
    text-align: right;
    margin-right: -1px;
    display: inline-block;
  }
  .input-socket {
    text-align: left;
    margin-left: -1px;
    display: inline-block;
  }
  .input-title,
  .output-title {
    vertical-align: middle;
    color: white;
    display: inline-block;
    font-family: sans-serif;
    font-size: 14px;
    margin: ${$socketmargin}px;
    line-height: ${$socketsize}px;
  }
  .input-control {
    z-index: 1;
    width: calc(100% - ${$socketsize + 2 * $socketmargin}px);
    vertical-align: middle;
    display: inline-block;
  }
  .control {
    display: block;
    padding: ${$socketmargin}px ${$socketsize / 2 + $socketmargin}px;
  }
  ${(props) => props.styles && props.styles(props)}
`;
