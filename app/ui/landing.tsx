"use client"

import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"
import LoginDropdown from "./loginDropdown";

const LandingWrapper = styled.div`
    height: 100vh;
    width: 100%;
    background-color: white;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 1;
`;

const CircleButton = styled.button`
    margin: 0 auto;
    height: 160px;
    width: 160px;
    border-radius: 250px;
    border: 0;
    cursor: pointer;
    background-color: #2549FF;
    backdrop-filter: blur(1000px);
    transition: background-color .3s ease;
    transition: box-shadow .3s ease;

    &:hover {
        background-color: #2549FF;
        box-shadow: 0px 0px 5px 5px #1987FB;
    }
`;

const ColorBar = styled.div`
  height: 100px;
  width: 600px;
  display: flex;
`;

const BarSegment = styled.div`
  width: 20%;
`;


interface LandingProps {
    active: boolean;
    show : boolean;
    user: object;
}

export default function Landing({ active, show, user }: LandingProps ) {
  const [logIn, setLogIn] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    if (user) {
        setLogIn(false)
        setClicked(true);
    } else {
        setLogIn(true)
        setClicked(false)
    }
  };

  const colors = [
    'rgba(255, 0, 0, 1)',    // Red
    'rgba(0, 255, 0, 1)',    // Green
    'rgba(0, 0, 255, 1)',    // Blue
    'rgba(255, 255, 0, 1)',  // Yellow
    'rgba(0, 255, 255, 1)',  // Cyan
    'rgba(255, 0, 255, 1)'   // Magenta
  ];

  return (
    <>
    {logIn && <LoginDropdown active={clicked} />}
    <LandingWrapper>
        <CircleButton onClick={handleClick}>Haiku Me</CircleButton>
    </LandingWrapper>
    </>
  );
}
