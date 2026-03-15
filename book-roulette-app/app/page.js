"use client";

import AddBook from "./components/add_book";
import SpinnerWheel from "./components/roulette";
import styled from "styled-components";
import {LightRays} from "@/components/ui/light-rays";
import { NeonGradientCard } from "@/components/ui/neon-gradient-card";
import { AuroraText } from "@/components/ui/aurora-text";

const AppContainer = styled.div`
  display: flex;
  height: 100vh; /* full page */
  gap: 20px;
  padding: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
    height: auto; /* allow scroll on smaller screens */
  }
`;

/* LEFT SIDE: Spinner */
const LeftPane = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

/* RIGHT SIDE: Add/Edit boxes */
const RightPane = styled.div`
  flex: 1.5;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const TopRightBox = styled.div`
  flex: 1; /* smaller top box */
  background-color: #ffe5ec;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
`;

const BottomRightBox = styled.div`
  flex: 2; /* bigger bottom box for list */
  background-color: #fff0f5;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  overflow-y: auto; /* scroll if list is long */
`;

const books = [""];

export default function Home() {
  return (
    <AppContainer>
      <LightRays />
      <LeftPane>
        <div>
          <AuroraText>Book Roulette</AuroraText>
          <SpinnerWheel books={books}/>
        </div>
      </LeftPane>
      <RightPane>
        <NeonGradientCard>
            <AddBook />
        </NeonGradientCard>
      </RightPane>
    </AppContainer>
  );
}
