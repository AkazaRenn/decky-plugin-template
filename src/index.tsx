import {
  ButtonItem,
  PanelSection,
  PanelSectionRow,
  Router,
  // ServerAPI,
  staticClasses,
} from "@decky/ui";
import {
  addEventListener,
  removeEventListener,
  call,
  callable,
  definePlugin,
  toaster,
  // routerHook
} from "@decky/api"
// import { call, callable } from "@decky/backend";
import { useState } from "react";
import { FaShip } from "react-icons/fa";

// import logo from "../assets/logo.png";

// interface AddMethodArgs {
//   left: number;
//   right: number;
// }
// const add = callable<[first: number, second: number], number>("add");
const startTimer = callable<[], void>("start_timer");
const test = callable<[], any>("test");

function Content() {
  const [result, setResult] = useState<number | undefined>();

  const onClick = async () => {
    let result;
    console.log("Using call");
    result = await call<[], any>("test");
    console.log("call result", result);
    console.log("Using callable");
    result = await test();
    console.log("callable result", result);
    setResult(result.toString());
  };

  return (
    <PanelSection title="Panel Section">
      <PanelSectionRow>
        <ButtonItem
          layout="below"
          onClick={onClick}
        >
          {result || "Add two numbers via Python"}
        </ButtonItem>
      </PanelSectionRow>
      <PanelSectionRow>
        <ButtonItem
          layout="below"
          onClick={() => startTimer()}
        >
          {"Start Python timer"}
        </ButtonItem>
      </PanelSectionRow>

      {/* <PanelSectionRow>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={logo} />
        </div>
      </PanelSectionRow> */}

      <PanelSectionRow>
        <ButtonItem
          layout="below"
          onClick={() => {
            Navigation.CloseSideMenus();
            Navigation.Navigate("/decky-plugin-test");
          }}
        >
          Router
        </ButtonItem>
      </PanelSectionRow>
    </PanelSection>
  );
};

export default definePlugin(() => {
  // serverApi.routerHook.addRoute("/decky-plugin-test", DeckyPluginRouterTest, {
  //   exact: true,
  // });
  // console.log("init plugin", call, callable)
  const listener = addEventListener<[
    test1: string,
    test2: boolean,
    test3: number
  ]>("test_event", (test1, test2, test3) => {
    console.log("Template got event", test1, test2, test3)
    toaster.toast({
      title: "template got event",
      body: `${test1}, ${test2}, ${test3}`
    });
  });
  return {
    title: <div className={staticClasses.Title}>API v2 Example Plugin</div>,
    content: <Content />,
    icon: <FaShip />,
    onDismount() {
      console.log("Unloading")
      removeEventListener("test_event", listener);
      // serverApi.routerHook.removeRoute("/decky-plugin-test");
    },
  };
});
