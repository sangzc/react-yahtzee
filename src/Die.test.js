import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Die from "./Die";

it("renders without crashing", () => {
  shallow(<Die value="1" />);
});

it("matches snapshot when unlocked", () => {
  const wrapper = shallow(<Die value="1" />);
  const serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

it("matches snapshot when locked", () => {
  const wrapper = shallow(<Die value="1" locked />);
  const serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});