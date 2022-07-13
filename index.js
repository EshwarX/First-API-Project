/**
 *Name: Xavier Huang
 *Date: May 1st 2022
 *Section: CSE 154 AE
 *This is the index.js file for CP3. It declares the interaction
 *happening in the webpages. It reads the search selection and
 *inputs from the user and fetches API accordingly, then displays
 *the result on the page.
 */

"use strict";
(function() {

  const BASE_URL = "http://www.boredapi.com/api/activity";

  window.addEventListener("load", init);

  /**
   * Start the program by adding an UI event to the button
   */
  function init() {
    let startButton = id("random-activity");
    startButton.addEventListener("click", makeRequest);
  }

  /**
   * Requests the data from given API url, process the data,
   * display and catch errors.
   */
  function makeRequest() {
    id("loading-page").classList.remove("hidden");
    id("random-generate").classList.add("hidden");
    id("random-generate").innerHTML = "";
    let request = decideInput();
    fetch(request)
      .then(statusCheck)
      .then(resp => resp.json())
      .then(processData)
      .catch(handleError);
  }

  /**
   * Decides the fetch URL by reading the selection.
   * @returns {string} target fetch URL.
   */
  function decideInput() {
    let element = decideMode();
    let output;
    if (element !== "none") {
      output = BASE_URL + "?" + element + "=" + id("input-id").value;
    } else {
      output = BASE_URL + "/";
    }
    return output;
  }

  /**
   * The function that reads the response data and display them.
   * @param {object} responseData fetched object
   */
  function processData(responseData) {
    generateCard(responseData);
  }

  /**
   * Reads the user selection of which
   * search mode they want to use
   * @returns {string} returns the selected search mode
   */
  function decideMode() {
    let element = document.getElementsByName("attri");
    for (let i = 0; i < element.length; i++) {
      if (element[i].checked) {
        return element[i].value;
      }
    }
  }

  /**
   * Writes the contexts into HTML file.
   * @param {object} responseData fetched object.
   */
  function generateCard(responseData) {
    createContent("Activity: " + responseData.activity);
    createContent("Category: " + responseData.type);
    createContent("Participants: " + responseData.participants);
    createContent("Price: " + responseData.price);
    createContent("Link: " + responseData.link);
    createContent("Key: " + responseData.key);
    createContent("Accessibility: " + responseData.accessbility);
    id("loading-page").classList.add("hidden");
    id("random-generate").classList.remove("hidden");
  }

  /**
   * Adds the text into HTML file
   * @param {string} data input text
   */
  function createContent(data) {
    let element = document.createElement("p");
    element.textContent = data;
    id("random-generate").appendChild(element);
  }

  /**
   * checks the status and throw and error, return if no error.
   * @param {object} res fetched object
   * @returns {object} same value if no error.
   */
  async function statusCheck(res) {
    if (!res.ok) {
      throw new Error(await res.text());
    }
    return res;
  }

  /**
   * Function that handles error, if there's an error, display to the user.
   * @param {error} err caught error
   */
  function handleError(err) {
    let text = document.createElement('p');
    text.textContent = err;
    id("random-generate").appendChild(text);
    id("loading-page").classList.add("hidden");
    id("random-generate").classList.remove("hidden");
  }

  /**
   * Returns the element with the id.
   * @param {String} id - a string of id name.
   * @return {object} found element.
   */
  function id(id) {
    return document.getElementById(id);
  }
})();