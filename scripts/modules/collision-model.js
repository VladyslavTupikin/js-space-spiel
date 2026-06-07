/*
collision-model.js: Module describes basic collision for any entity.
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

import { Point } from "./point.js";

export class CollisionModel {
  #id;
  #radius;
  #center;

  constructor(id, radius, center) {
    if (![id, radius].every((p) => Number.isFinite(p))) {
      throw new TypeError(
        `Invalid type: id:${id} / radius:${radius} is not a number`,
      );
    }

    if (!(center instanceof Point)) {
      throw new TypeError(
        "Invalid type: parameter center must be an instance of Point",
      );
    }

    this.#id = id;
    this.#radius = radius;
    this.#center = center;
  }

  toString() {
    return `${this.#id} ${this.#radius} ${this.#center.toString()}`;
  }

  get id() {
    return this.#id;
  }

  get radius() {
    return this.#radius;
  }

  get center() {
    return this.#center;
  }

  set center(newCenter) {
    if (!(newCenter instanceof Point)) {
      throw new TypeError(
        "Invalid type: parameter newCenter must be an instance of Point",
      );
    }

    this.#center = newCenter;
  }
}
