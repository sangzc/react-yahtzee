import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Dice from "./Dice";

it("renders without crashing", () => {
  shallow(
    <Dice dice={[1, 2, 6, 4, 4]} locked={[false, false, false, true, true]} />
  );
});

it("matches snapshot", () => {
  const wrapper = shallow(
    <Dice dice={[1, 2, 6, 4, 4]} locked={[false, false, false, true, true]} />
  );
  const serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});
