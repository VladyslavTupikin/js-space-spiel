/*
map.js: Module describes singleton map class.
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

import { Database } from "../engine/db.js";
import { Point } from "../engine/point.js";
import { GameObject } from "../engine/game-object.js";

export class Map extends GameObject {
  static #instance = null;

  #width;
  #height;
  #measureUnit = "px";

  constructor(db, center, width = 600, height = 800) {
    super(db, center);

    if (Map.#instance) {
      return Map.#instance;
    }

    if (![width, height].every((p) => Number.isFinite(p))) {
      throw new TypeError(
        `Invalid type: width:${width} / height:${height} is not a number`,
      );
    }

    this.#width = width;
    this.#height = height;
    Map.#instance = this;
  }

  toString() {
    return (
      super.toString() + `${this.#width} ${this.#height} ${this.#measureUnit}`
    );
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

  get measureUnit() {
    return this.#measureUnit;
  }
}
