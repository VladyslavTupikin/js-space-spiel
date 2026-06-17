/*
render-module.js: File describes RenderModule class.
Copyright (C) 2026  Vladyslav Tupikin
Contact: vladtupikin7@gmail.com

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { Style } from "./style.js";
import { Database } from "./db.js";
import { Point } from "./point.js";

export class RenderModel {
  #id;
  #styleClass;
  #db;
  #dynamic;
  #isVisible;

  constructor(db, id, dynamic, styleClass) {
    if (!Number.isFinite(id)) {
      throw new TypeError("Invalid type: id is not a number");
    }

    if (typeof dynamic !== "boolean") {
      throw new TypeError("Invalid type: dynamic is not a boolean");
    }

    if (typeof styleClass !== "string" || styleClass.length === 0) {
      throw new TypeError(
        "Invalid type: parameter styleClass must be a valid HTML class String",
      );
    }

    if (!(db instanceof Database)) {
      throw new TypeError(
        "Invalid type: parameter db must be an instance of Database",
      );
    }

    this.#id = id;
    this.#dynamic = dynamic;
    this.#styleClass = styleClass;
    this.#db = db;
    this.#isVisible = true;
  }

  toString() {
    return `${this.#id} ${this.#styleClass}`;
  }

  get id() {
    return this.#id;
  }

  get styleClass() {
    return this.#styleClass;
  }

  get isVisible() {
    return this.#isVisible;
  }

  set isVisible(value) {
    if (typeof value !== "boolean") {
      throw new TypeError("Invalid type: visible value must be boolean");
    }
    this.#isVisible = value;
  }

  renderObject() {
    if (this.#isVisible !== true) {
      console.debug(`Object ${this.#id} is visible: ${this.#isVisible}`);
      return;
    }

    const parentObject = this.#db.renderModels.getParentNode(
      this.#styleClass,
      null,
    );

    const parentSelector = `.${parentObject.name}`;

    const parentElement = document.querySelector(parentSelector);
    if (!parentElement) {
      throw new Error(
        `No element found for selector ${parentSelector}. Cannot render object.`,
      );
    }

    const childElement = parentElement.querySelector(`.${this.#styleClass}`);
    if (childElement) {
      childElement.remove();
    }

    const element = document.createElement("div");
    element.className = this.#styleClass;

    let point = null;
    let currentObject = null;

    const gameObj = this.#db.GetGameObject(this.#id);
    if (!gameObj) {
      throw new Error(
        `No game object found for object with id ${this.#id}. Cannot render object.`,
      );
    }

    currentObject = gameObj;
    point = gameObj.center;

    if (!point) {
      throw new Error(
        `No position found for object with id ${this.#id}. Cannot render object. ${point}`,
      );
    }

    // Object center point prints, debug only!!!
    if (this.#styleClass == "player-ship") {
      console.log(`${point.toString()}`);
    }

    element.style.left = `${point.x}px`;
    element.style.top = `${point.y}px`;

    parentElement.appendChild(element);
  }
}
