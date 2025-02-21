"use client"

import React from "react"
import styled, { keyframes } from "styled-components"

const fadeInSlideDown = keyframes`
  from {
    opacity: 0;
    height: 0;
  }
  to {
    opacity: 1;
    height: 100vh;
  }
`;

const DropdownWrapper = styled.div`
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.25);
    position: absolute;
    z-index: 5;
    animation: ${(props) => (props.$isActive ? fadeInSlideDown : '')} 0.3s ease;
`;

export default function LoginDropdown() {

    return (
        <DropdownWrapper>
        </DropdownWrapper>
    )
}