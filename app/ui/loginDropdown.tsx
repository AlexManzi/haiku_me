"use client"

import React, { useState, useEffect }from "react"
import styled, { keyframes } from "styled-components"
import { signIn } from "next-auth/react"
import GoogleLogo from "../../public/assets/GoogleLogo.png"
import Image from "next/image"
import { Open_Sans} from "next/font/google";

const openSans = Open_Sans({
  variable: "--font-Sriracha",
  subsets: ["latin"],
  weight: ["500"]
});

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
    backdrop-filter: blur(2px);
    align-items: center;
    animation: ${fadeInSlideDown} .25s ease;
`;

const SignInArea = styled.div<{$show: boolean}>`
    display: flex;
    height: 32vh;
    min-height: 220px;
    flex-direction: column;
    background-color: white;
    width: 320px;
    border-radius: 12px;
    opacity: ${(props) => props.$show ? '1' : '0'};
    transition: all .3s ease;
`;

const SingInHeading = styled.h1`
    margin: 0 auto;
    padding-top: 1.5rem;
    color: #2549FF;
`;

const SignInText = styled.p`
    font-size: 1rem;
    color: black;
    margin: 0 auto;
    margin-bottom: 1.5rem;
`;

const Login = styled.div`
    display: flex;
    margin-top: 2rem;
    display: flex;
    color: black;
    align-items: center;
    background-color: white;
    border: 1px solid rgb(229,230,236);
    width: max-content;
    text-align: center;
    border-radius: 2px;
    color: #525659;
    cursor: pointer;
    margin: 0 auto;
    box-shadow: .1px .1px 5px rgb(229,230,236);
    transition: border .3s ease, box-shadow .3s ease;

    &:hover {
        box-shadow: .1px .1px 5px rgb(26,115,231);
        border: 1px solid rgb(26,115,231);
    }

    p {
       padding-right: .75rem;
        padding-left: .5rem;
        padding-top: .65rem;
        padding-bottom: .65rem;
        font-size: 1rem;
        font-weight: 600;
        transition: all .3s ease;

        &:hover {
            background-color: rgb(26,115,231);
            color: white;
        }
    }
`;

const GLogo = styled(Image)`
    height: 20px;
    width: auto;
    padding-right: .5rem;
    padding-left: .5rem;
`;

type LoginDropdownProps = {
    active: boolean;
}

export default function LoginDropdown( { active }: LoginDropdownProps ) {
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
    }, []);

    return (
        <DropdownWrapper $isActive={active}>
            <SignInArea $show={showSignIn}>
                <SingInHeading>Haiku_me</SingInHeading>
                <SignInText>AI Haikus for every moment</SignInText>
                <Login onClick={() => signIn('google', { callbackUrl: '/'})}>
                <GLogo src={GoogleLogo} alt="Google Logo"/>
                <p className={openSans.className}>Sign in with Google</p>
                </Login>
            </SignInArea>
        </DropdownWrapper>
    )
}