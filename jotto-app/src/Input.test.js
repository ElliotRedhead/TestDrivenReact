import React from "react";
import { shallow } from "enzyme";
import { findByTestAttr, checkProps } from "../test/testUtils";
import Input from "./Input";

/**
 * Setup function for app component.
 * @param {string} secretWord - The string that the user is attempting to guess.
 * @returns {ShallowWrapper} The App component wrapper.
 */
const setup = (secretWord="party") => {
	return shallow(<Input secretWord={secretWord}/>);

};

test("App renders without error", () => {
	const wrapper = setup();
	const component = findByTestAttr(wrapper, "component-input");
	expect(component.length).toBe(1);
});

test("Does notthrowwarning with expected props", () => {
	checkProps(Input, { secretWord: "party" });
});

describe("State controlled input field.", () => {
	test("state updates with value of input box upon change", () => {
		const mockSetCurrentGuess = jest.fn();
		React.useState = jest.fn(() => ["", mockSetCurrentGuess]);

		const wrapper = setup();
		const inputBox = findByTestAttr(wrapper, "input-box");

		const mockEvent = { target: { value: "train" } };
		inputBox.simulate("change", mockEvent);

		expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
	});
});