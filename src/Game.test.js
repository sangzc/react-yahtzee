import React from "react";
import { shallow, mount } from "enzyme";
import Game from "./Game";

it("renders without crashing", () => {
  shallow(<Game />);
});

it("handles locking of dice", () => {
  const wrapper = mount(<Game />);
  expect(wrapper.state().locked).toEqual([false, false, false, false, false]);
  wrapper
    .find(".Die")
    .at(0)
    .simulate("click");
  expect(wrapper.state().locked).toEqual([true, false, false, false, false]);
});

it("disallows rolling with 0 rolls left", () => {
  const wrapper = mount(<Game />);
  wrapper.setState({ rollsLeft: 1 });
  const rollButton = wrapper.find(".Game-reroll");
  rollButton.simulate("click");
  const { dice, locked, rollsLeft } = wrapper.state();

  // no more roll, so all dice should be locked
  expect(rollsLeft).toEqual(0);
  expect(locked).toEqual([true, true, true, true, true]);

  // after clicking on the roll button, nothing should change
  rollButton.simulate("click");
  expect(wrapper.state().dice).toEqual(dice);
  expect(wrapper.state().locked).toEqual(locked);
  expect(wrapper.state().rollsLeft).toEqual(rollsLeft);
});

it("disallows using the same score line multiple times", () => {
  const wrapper = mount(<Game />);
  // scenario: we've already used the ones line to score 2 points
  // the current state of the dice would give us 3 for the ones line.
  wrapper.setState({ dice: [1, 1, 1, 3, 4], scores: { ones: 2 }});

  const onesRuleRow = wrapper.find(".RuleRow").at(0);
  onesRuleRow.simulate("click");

  // but the score is unchanged
  expect(wrapper.state().scores.ones).toBe(2);
});