import { useEffect } from "react";
import { AiplComponentProvider } from "../src/provider/AiplComponentProvider";
import { hideLoadingScreen } from "../src/ui/hideLoadingScreen";
import { pizzaDemoConfig } from "../src/app-front/pizza-demo/pizzaDemoConfig";
import { TopLayout } from "./TopLayout";
import { AiplChat } from "../src/aipl-components/AiplChat";

export const LifeIsHard = () => {
  useEffect(() => {
    hideLoadingScreen();
  }, []);

  return (
    <AiplComponentProvider config={pizzaDemoConfig}>
      <TopLayout />
      {/* <div>
        <h1>Life is hard</h1>
        <p>But it's harder if you're stupid</p>

      </div> */}
      <AiplChat />
    </AiplComponentProvider>
  );
};
