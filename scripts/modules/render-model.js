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
  #style;
  #db;

  constructor(id, styleClass, db) {
    if (!Number.isFinite(id)) {
      throw new TypeError("Invalid type: id is not a number");
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
    this.#style = new Style(styleClass);
    this.#db = db;
  }

  toString() {
    return `${this.#id} ${this.#style.toString()}`;
  }

  get id() {
    return this.#id;
  }

  renderObject(parentSelector) {
    if (typeof parentSelector !== "string") {
      throw new TypeError(
        "Invalid type: parameter parentSelector must be a valid CSS class selector String",
      );
    }

    const parentElement = document.querySelector(parentSelector);
    if (!parentElement) {
      throw new Error(
        `No element found for selector ${parentSelector}. Cannot render object.`,
      );
    }

    const childElement = parentElement.querySelector(this.#style.styleClass);
    if (childElement) {
      childElement.remove();
    }

    const element = document.createElement("div");
    element.className = this.#style.styleClass;

    const collisionObj = this.#db.GetCollisionModel(this.#id);
    if (!collisionObj) {
      throw new Error(
        `No collision model found for object with id ${this.#id}. Cannot render object.`,
      );
    }

    const point = collisionObj.center;

    if (!point) {
      throw new Error(
        `No position found for object with id ${this.#id}. Cannot render object.`,
      );
    }

    element.style.left = `${point.x}px`;
    element.style.top = `${point.y}px`;

    parentElement.appendChild(element);
  }
}
