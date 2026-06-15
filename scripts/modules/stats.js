/*
stats.js: Module describes singleton Stats class.
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

import { Database } from "./db.js";
import { Point } from "./point.js";

export class Stats {
  static #instance = null;
  #id;
  #width;
  #height;
  #db;
  #center;

  constructor(db, width = 600, height = 800, center) {
    if (!(db instanceof Database)) {
      throw new TypeError(
        "Invalid type: parameter db must be an instance of Database",
      );
    }

    if (Stats.#instance) {
      return Stats.#instance;
    }

    if (![width, height].every((p) => Number.isFinite(p))) {
      throw new TypeError(
        `Invalid type: width:${width} / height:${height} is not a number`,
      );
    }

    if (!(center instanceof Point)) {
      throw new TypeError(
        "Invalid type: parameter point must be an instance of Point",
      );
    }

    this.#id = db.GenerateID();
    this.#width = width;
    this.#height = height;
    this.#db = db;
    this.#center = center;
    Stats.#instance = this;
  }

  toString() {
    return `${this.#width} ${this.#height}`;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  set width(value) {
    if (!Number.isFinite(value)) {
      throw new TypeError("Invalid input: value not a number");
    }
    this.#width = value;
  }

  set height(value) {
    if (!Number.isFinite(value)) {
      throw new TypeError("Invalid input: value not a number");
    }
    this.#height = value;
  }

  get id() {
    return this.#id;
  }

  get center() {
    return this.#center;
  }
}
