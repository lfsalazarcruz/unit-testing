import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App component
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @param {any} state - Initial setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

/**
 * Return ShallowWrapper containing node(s) with the given data-test value
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within
 * @param {string} val - Value of data-test attribute for search
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

test("renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});
test("renders increment button", () => {
  const wrapper = setup();
  const buttonComponent = findByTestAttr(wrapper, "component-button");
  expect(buttonComponent.length).toBe(1);
});
test("renders counter display", () => {
  const wrapper = setup();
  const displayComponent = findByTestAttr(wrapper, "component-display");
  expect(displayComponent.length).toBe(1);
});
test("counters starts at 0", () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state("count");
  expect(initialCounterState).toBe(0);
});
test("clicking button increments counter display", () => {
  const count = 7;
  const wrapper = setup(null, { count });

  // Find button and click
  const buttonComponent = findByTestAttr(wrapper, "component-button");
  buttonComponent.simulate("click");

  // Find display and test value
  const displayComponent = findByTestAttr(wrapper, "component-display");
  expect(displayComponent.text()).toContain(count + 1);
});
