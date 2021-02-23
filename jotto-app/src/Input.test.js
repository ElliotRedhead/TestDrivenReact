import React from "react";
import { mount } from "enzyme";
import { findByTestAttr, checkProps } from "../test/testUtils";
import Input from "./Input";
import languageContext from "./contexts/languageContext";

/**
 * Setup function for app component.
 * @param {object} testValues - Contexts and props for this test.
 * @returns {ShallowWrapper} The App component wrapper.
 */
const setup = ({ language, secretWord }) => {
	language = language || "en";
	secretWord = secretWord || "party";

	return mount(
		<languageContext.Provider value={language}>
			<Input secretWord={secretWord}/>
		</languageContext.Provider>
	);

};

describe("languagePicker", () => {
	test("Correctly renders submit string in English", () => {
		const wrapper = setup({ language:"en" });
		const submitButton = findByTestAttr(wrapper, "submit-button");
		expect(submitButton.text()).toBe("Submit");
	});
	test("Correctly renders submit string in Emoji", () => {
		const wrapper = setup({ language: "emoji" });
		expect(wrapper.text()).toBe("🚀");
	});
});

test("App renders without error", () => {
	const wrapper = setup({ language:"emoji" });
	const component = findByTestAttr(wrapper, "component-input");
	expect(component.length).toBe(1);
});

test("Does not throw warning with expected props", () => {
	checkProps(Input, { secretWord: "party" });
});

describe("State controlled input field.", () => {
	let mockSetCurrentGuess = jest.fn();
	let wrapper;
	beforeEach(() => {
		mockSetCurrentGuess.mockClear();
		React.useState = jest.fn(() => ["", mockSetCurrentGuess]);
		wrapper = setup({});
	});
	test("state updates with value of input box upon change", () => {
		const inputBox = findByTestAttr(wrapper, "input-box");

		const mockEvent = { target: { value: "train" } };
		inputBox.simulate("change", mockEvent);

		expect(mockSetCurrentGuess).toHaveBeenCalledWith("train");
	});
	test("field is cleared upon submit button click", () => {
		const submitButton = findByTestAttr(wrapper, "submit-button");

		submitButton.simulate("click", { preventDefault() {} });
		expect(mockSetCurrentGuess).toHaveBeenCalledWith("");
	});
});

