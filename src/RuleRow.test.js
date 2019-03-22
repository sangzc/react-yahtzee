import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import RuleRow from "./RuleRow";

it("renders without crashing", () => {
  shallow(<RuleRow name="Ones" />);
});

it("matches snapshot when unscored", () => {
  const wrapper = shallow(<RuleRow name="Ones" />);
  const serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

it("matches snapshot when scored", () => {
  const wrapper = shallow(<RuleRow name="Ones" score={3} />);
  const serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});