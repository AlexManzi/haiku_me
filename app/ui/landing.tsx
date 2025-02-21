"use client"

import React, { useState, useEffect } from "react"
import styled from "styled-components"
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
        box-shadow: 0px 0px 5px 5px green;
    }
`;

interface LandingProps {
    active: boolean;
    show : boolean;
    user: object;
}

export default function Landing({ active, show, user }: LandingProps ) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [clicked, setClicked] = useState(false);

  console.log(user)

  const handleClick = () => {
    setLoggedIn(true);
    setClicked(true);
  };

  return (
    <>
    {loggedIn && <LoginDropdown active={clicked} />}
    <LandingWrapper>
      <CircleButton onClick={handleClick}>Turn On</CircleButton>
    </LandingWrapper>
    </>
  );
}
