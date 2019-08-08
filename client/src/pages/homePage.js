import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { DESKTOP_XS, DESKTOP_XL } from '../constants/sizes';
import { BASE03, BASE02, CYAN, RED, BLUE, BASE3, BASE1, BASE2 } from '../constants/colors';

export const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${p => (p.theme === 'LIGHT' ? BASE3 : BASE02)};
  color: ${p => (p.theme === 'LIGHT' ? BASE03 : BASE1)};
`;

const StyledProjectPage = styled.div`
  display: grid;
  padding: 0 20px 0 20px;
  grid-auto-columns: auto;
  font-size: 1.2em;

  @media (min-width: ${DESKTOP_XS}) {
    width: 70vw;
  }

  @media (min-width: ${DESKTOP_XL}) {
    width: 50vw;
  }
`;

export const StyledA = styled.a`
  margin-bottom: 5px;
  text-decoration: none;
  outline: none;
  color: ${BLUE};

  :hover {
    text-decoration: underline;
  }
`;

const Contact = styled.div`
  ${StyledA} {
    margin-right: 20px;
  }
`;

const homePage = () => {
  const theme = useSelector(state => state.appSettings.theme);
  if (!theme) return null;
  return (
    <Wrapper theme={theme}>
      <StyledProjectPage>
        <p>
          Hello and welcome to my website. My name is Staffan Sandberg and I'm currently in the final stretch of my
          studies at <StyledA href="https://www.kth.se/"> Kungliga Tekniska Högskolan</StyledA> in the master's
          programme{' '}
          <StyledA href="https://www.kth.se/en/studies/master/interactivemediatechnology/description-1.593765">
            Interactive media technology
          </StyledA>
          .
        </p>
        <p>
          My bachelor was in{' '}
          <StyledA href="https://www.kth.se/student/kurser/program/TSVDK/20122/mal">
            Simulation Technology and Virtual Design
          </StyledA>{' '}
          also at KTH. Which sparked my interest for programming and graphics.
        </p>
        <p>
          My main interests are web development, game design and computer graphics. I also enjoy tinkering with servers,
          networks and general linux based operating systems.
        </p>
        <p>In my free time I enjoy playing guitar, video games, reading books and learn new things in general.</p>
        {/* <p>
          I created this website from scratch using the following: <br />
          Front-end: React, CSS Grid and Webpack. <br />
          Back-end: Node.js, Express, MongoDB and Heroku.
        </p> */}
        <p>
          On this site you can see different projects that I've been a part of and blog posts about things I've learnt
          and want to share.
        </p>
        <div>
          {' '}
          I'm always open to new opportunities.
          <br />
          You can find and contact me here:
        </div>
        <Contact>
          <StyledA href="https://www.linkedin.com/in/stsa/">Linkedin</StyledA>
          <StyledA href="https://github.com/Sandsten">Github</StyledA>
          <StyledA target="_blank" href="mailto:stsand@kth.se" rel="noopener noreferrer">
            Email
          </StyledA>
        </Contact>
      </StyledProjectPage>
    </Wrapper>
  );
};

export default homePage;
