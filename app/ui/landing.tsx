"use client"

import React, { useState, useEffect } from "react"
import styled, { keyframes, css } from "styled-components"
import LoginDropdown from "./loginDropdown";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const blurIn = keyframes`

`;

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
  width: auto;
  display: flex;
  margin: 0 auto;
    animation: ${fadeIn} 0.4s ease;
`;

const BarSegment = styled.div<{$color: string}>`
  width: 200px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.$color};

  p {
    font-weight: 700;
    color: black;
  }

  &:hover {
    background-color: white;
    cursor: pointer;
  }

`;

type LandingProps = {
    user: any;
    emotion: string;
}

export default function Landing( { user }: LandingProps ) {
  const [logIn, setLogIn] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false)
  const [userEmotion, setUserEmotion] = useState('');
  const [haiku, setHaiku] = useState('');

  let requestString = `Write a haiku elliciting the emotion of ${userEmotion}`

  const sendRequest = async ({emotion}: LandingProps) => {
    setUserEmotion(emotion)
    const messages = [
      { role: 'user', content: requestString }
    ];

  const response = await fetch('/api/gptconnect', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ messages }),
  });

  const data = await response.json();
    setHaiku(data);
  };

  console.log(haiku)

  const handleClick = () => {
    if (user) {
        setLogIn(false)
        setClicked(true);
        setOpen(true)
    } else {
        setLogIn(true)
        setClicked(true)
    }
  };

  type ColorMap = {
    [emotion: string]: string;
  }

  const colors: ColorMap = {
    "Confidence" : 'rgba(255, 0, 0, 1)',
    "Calmness" : 'rgba(0, 255, 0, 1)',
    "Trust" : 'rgba(0, 0, 255, 1)',
    "Happiness" : 'rgba(255, 255, 0, 1)',
    "Peace" : 'rgba(0, 255, 255, 1)',
    "Creativity" : 'rgba(255, 0, 255, 1)'
  };

  

  const segments = Object.entries(colors).map(([emotion, color], idx) => {
    return (
        <BarSegment key={idx} $color={color} onClick={() => sendRequest({emotion})}><p>{emotion}</p></BarSegment>
    )
  });

  return (
    <>
    {logIn && <LoginDropdown active={clicked} />}
    <LandingWrapper>
        {open ? <ColorBar>{segments}</ColorBar> : <CircleButton onClick={handleClick}>Haiku Me</CircleButton>}
    </LandingWrapper>
    </>
  );
}
