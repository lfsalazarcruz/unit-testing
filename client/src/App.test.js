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
  const buttonComponent = findByTestAttr(wrapper, "increment-button");
  expect(buttonComponent.length).toBe(1);
});

test("renders decrement button", () => {
  const wrapper = setup();
  const buttonComponent = findByTestAttr(wrapper, "decrement-button");
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
  const button = findByTestAttr(wrapper, "increment-button");
  button.simulate("click");

  // Find display and test value
  const display = findByTestAttr(wrapper, "component-display");
  expect(display.text()).toContain(count + 1);
});

// STRECH GOALS: DECREMENT BUTTON, DISPLAY ERROR, CLEAR ERROR
test("clicking decrement button decrements counter display by 1", () => {
  const count = 8;
  const wrapper = setup(null, { count });

  // Find button and click
  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate("click");

  // Find display and test value
  const display = findByTestAttr(wrapper, "component-display");
  expect(display.text()).toContain(count - 1);
});

test("Display error message if counter is going to be less than 0, don't decrement counter", () => {
  const count = 0;
  const wrapper = setup(null, { count });

  // Find decrement button and click
  const button = findByTestAttr(wrapper, "decrement-button");
  button.simulate("click");

  // Find display and test value
  const display = findByTestAttr(wrapper, "component-display");
  expect(display.text()).toContain(count);

  // Update UI after clicking button when counter is at 0
  wrapper.update();

  // Find error message
  const errorMessage = findByTestAttr(wrapper, "error-message");
  expect(errorMessage.length).toBe(1);
});

test("Clear error message when increment button is clicked", () => {
  const count = 0;
  const error = true;
  const wrapper = setup(null, { count, error });

  // Finding error message when error flag in state is set to true
  const errorMessage = findByTestAttr(wrapper, "error-message");
  expect(errorMessage.length).toBe(1);

  // Find increment button and click
  const button = findByTestAttr(wrapper, "increment-button");
  button.simulate("click");

  // Update UI after clicking increment button
  wrapper.update();

  // Find display and test if it increments
  const display = findByTestAttr(wrapper, "component-display");
  expect(display.text()).toContain(count + 1);

  // If no error is displaying, clearError length should be equal to 0
  const clearError = findByTestAttr(wrapper, "error-message");
  expect(clearError.length).toBe(0);
});
