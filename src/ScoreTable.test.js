import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import ScoreTable from "./ScoreTable";

const scores = {
  ones: undefined,
  twos: undefined,
  threes: undefined,
  fours: undefined,
  fives: undefined,
  sixes: undefined,
  threeOfKind: undefined,
  fourOfKind: undefined,
  fullHouse: undefined,
  smallStraight: undefined,
  largeStraight: undefined,
  yahtzee: undefined,
  chance: undefined
}

it("renders without crashing", () => {
  shallow(<ScoreTable scores={scores} />);
});

it("matches snapshot", () => {
  const wrapper = shallow(<ScoreTable scores={scores} />);
  const serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});
