"use client"

import React, { useState, useEffect }from "react"
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

const DropdownWrapper = styled.div<{$isActive: boolean}>`
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${(props) => (props.$isActive ? fadeInSlideDown : '')} 0.3s ease;
`;

const SignInArea = styled.div<{$show: boolean}>`
    display: flex;
    height: 40vh;
    background-color: white;
    width: 30%;
    opacity: ${(props) => props.$show ? '1' : '0'};
    transition: all .3s ease;
`;

const SingInHeading = styled.h1`
    margin: 0 auto;
    padding-top: 1.5rem;
    color: #2549FF;
`;

interface LoginDropdownProps {
    active: boolean;
    show: boolean;
}

export default function LoginDropdown({ active, show }: LoginDropdownProps ) {
    const [showSignIn, setShowSignIn] = useState(false);

    useEffect(() => {
        if (active) {
            const timer1 = setTimeout(() => {
                setShowSignIn(true)
            }, 350);

            return () => {
                clearTimeout(timer1)
            }
        }
    }, [])


    return (
        <DropdownWrapper $isActive={active}>
            <SignInArea $show={showSignIn}>
                <SingInHeading>Haiku_me</SingInHeading>
            </SignInArea>
        </DropdownWrapper>
    )
}