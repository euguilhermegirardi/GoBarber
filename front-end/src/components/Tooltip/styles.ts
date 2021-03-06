import styled from "styled-components";

export const Container = styled.div`
  /* Every 'position: absolute' inside of this container will be relative to this container and not to the whole screen */
  position: relative;

  span {
    width: 160px;
    background: #ff9000;
    padding: 8px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden; /* It hides the element if it is not with opacity: 1 */

    position: absolute;
    bottom: calc(100% + 12px);
    /* Centralize */
    left: 50%;
    transform: translateX(-50%);
    /* Centralize */
    color: #312e38;

    /* Half arrow down */
    &::before {
      content: "";
      position: absolute;
      border-style: solid;
      border-color: #ff9000 transparent;
      border-width: 6px 6px 0 6px;
      bottom: 20px;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
