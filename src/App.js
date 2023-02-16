import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

import { INIT_SUMMARY } from "./helper/contants";
import Delivery from "./sections/Delivery";
import Payment from "./sections/Payment";
import Finish from "./sections/Finish";
import {
  AppContainer,
  TabContent,
  TabItem,
  TabNumber,
  Tab,
} from "./components";

const TABS = [
  {
    name: "Delivery",
    component: (props) => <Delivery {...props} />,
  },
  {
    name: "Payment",
    component: (props) => <Payment {...props} />,
  },
  {
    name: "Finish",
    component: (props) => <Finish {...props} />,
  },
];

function App() {
  const STORAGE_DATA = JSON.parse(localStorage.getItem("formData"));

  const [activeTab, setActiveTab] = useState(
    STORAGE_DATA?.activeTab ? STORAGE_DATA.activeTab : TABS[0].name
  );
  const [summary, setSummary] = useState(INIT_SUMMARY);

  const continueForm = (data) => {
    const nextTab =
      TABS[TABS.findIndex((tab) => tab.name === activeTab) + 1].name;
    setActiveTab(nextTab);
    localStorage.setItem(
      "formData",
      JSON.stringify({
        activeTab: nextTab,
        data: {
          ...STORAGE_DATA?.data,
          ...data,
        },
      })
    );
  };

  return (
    <>
      <AppContainer>
        <Tab>
          {TABS.map((tab, i) => (
            <TabItem key={tab.name + "-tab-key"}>
              <TabNumber
                isActive={i <= TABS.findIndex((v) => v.name === activeTab)}
              >
                {i + 1}
              </TabNumber>
              {tab.name}
            </TabItem>
          ))}
        </Tab>
        <div style={{ marginBottom: "1rem" }} className="font-weight-600">
          <FiArrowLeft
            style={{ marginRight: ".5rem", verticalAlign: "middle" }}
            size={18}
          />
          Back To Cart
        </div>
        {TABS.map((tab) => (
          <TabContent
            isActive={activeTab === tab.name}
            key={tab.name + "-tab-content"}
          >
            {tab.component({
              summary,
              setSummary,
              continueForm,
              data: STORAGE_DATA,
            })}
          </TabContent>
        ))}
      </AppContainer>
    </>
  );
}

export default App;
