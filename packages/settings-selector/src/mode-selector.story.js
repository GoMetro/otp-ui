import React from "react";
import { action } from "@storybook/addon-actions";
import { withInfo } from "@storybook/addon-info";

import ModeSelector, { getModeOptions } from "./mode-selector";
import { commonModes } from "./modes";

const background = story => (
  <div
    style={{
      backgroundColor: "#F0F0F0",
      height: "200px",
      padding: "15px",
      fontFamily: "Hind, sans-serif"
    }}
  >
    {story()}
  </div>
);

let selectedModes = ["BICYCLE", "TRAM", "RAIL", "BUS"];

let modeOptions = getModeOptions(commonModes, selectedModes);

const onChange = id => {
  const newModes = id.split("+");
  let finalModes = [];

  if (newModes[0] === "TRANSIT") {
    newModes.shift();
    finalModes = ["TRAM", "RAIL", "BUS"].concat(newModes);
  } else {
    finalModes = newModes;
  }

  selectedModes = finalModes;

  modeOptions = getModeOptions(commonModes, selectedModes);

  action("onChange")(id);
};

export default {
  title: "ModeSelector",
  decorators: [withInfo, background],
  parameters: {
    info: {
      text: `
      ModeSelector is the control container where the OTP user selects
      the primary transportation modes such as transit, bike, walk, or micromobility.
     `
    }
  }
};

export const normal = () => (
  <ModeSelector modes={modeOptions} onChange={onChange} />
);
