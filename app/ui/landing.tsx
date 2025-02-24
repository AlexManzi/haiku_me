"use client"

import React, { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import LoginDropdown from "./loginDropdown";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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

const CircleButton = styled.div`
    display: flex;
    margin: 0 auto;
    text-align: center;
    align-items: center;
    justify-content: center;
    height: 160px;
    width: 160px;
    border-radius: 250px;
    border: 0;
    cursor: pointer;
    background-color: #22ABFF;
    backdrop-filter: blur(1000px);
    transition: all .3s ease;
    font-size: 1.5rem;

    p {
        margin-top: -.25rem;
    }

    &:hover {
        background-color: #22ABFF;
        box-shadow: 0px 0px 25px 1px #22ABFF;
        font-size: 1.6rem;
    }
`;

const ColorBar = styled.div`
  height: 70px;
  width: auto;
  display: flex;
  gap: .5rem;
  margin: 0 auto;
    animation: ${fadeIn} 0.4s ease;
`;

const BarSegment = styled.div<{$color: string}>`
  width: 120px;
  height: 100%;
  display: flex;
  color: black;
  align-items: center;
  border-bottom: 3px solid white;
  justify-content: center;
  transition: all .2s ease;
  background-color: ${(props) => props.$color};

  p {
    font-weight: 700;
    font-size: 1.15rem;
  }

  &:hover {
    cursor: pointer;
    color: #22ABFF;
    border-bottom: 3px solid #22ABFF;
  }
`;

const HaikuText = styled.h1`
    color: black;
    animation: ${fadeIn} 0.4s ease;
    font-size: 2rem;
    margin: 0 auto;
`;

type LandingProps = {
    user: any;
    emotion: string;
    haiku: object;
}

export default function Landing( { user }: LandingProps ) {
  const [logIn, setLogIn] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [open, setOpen] = useState(false)
  const [haiku, setHaiku] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    if(haiku) {
      handleSynthesize(haiku)
    }
  }, [haiku])

  const sendRequest = async (emotion: string) => {
    let requestString = `Write a haiku elliciting the emotion of ${emotion}`
    
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
    setHaiku(data.result.content)
  };

  const handleSynthesize = async (haiku: string) => {
    try {
      const response = await fetch('/api/synthesize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ haiku }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      } else {
        console.error('Failed to synthesize speech');
      }
    } catch (err) {
      console.error('Error:', (err as Error).message);
    }
  };

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
    "Confidence" : '',
    "Calmness" : '',
    "Trust" : '',
    "Happiness" : '',
    "Peace" : '',
    "Creativity" : ''
  };

  const segments = Object.entries(colors).map(([emotion, color], idx) => {
    return (
        <BarSegment key={idx} $color={color} onClick={() => sendRequest(emotion)}><p>{emotion}</p></BarSegment>
    )
  });

  return (
    <>
    {logIn && <LoginDropdown active={clicked} />}
    {haiku ? 
    <LandingWrapper>
        {audioUrl && <audio controls src={audioUrl} />}
        {/* <HaikuText>{haiku.result.content}</HaikuText> */}
    </LandingWrapper>
    :
    <LandingWrapper>
        {open ? <ColorBar>{segments}</ColorBar> : <CircleButton onClick={handleClick}><p>Haiku Me</p></CircleButton>}
    </LandingWrapper>}
    </>
  );
}
