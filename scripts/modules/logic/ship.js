/*
ship.js: Module describes ship as a base class.
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

import { Point } from "../engine/point.js";
import { CollisionModel } from "../engine/collision-model.js";
import { GameObject } from "../engine/game-object.js";

export class Ship extends GameObject {
  #width;
  #height;
  #health;

  constructor(
    db,
    center = new Point(0, 0),
    width = 50,
    height = 50,
    health = 1,
  ) {
    super(db, center);

    if (![width, height, health].every((p) => Number.isFinite(p))) {
      throw new TypeError("Invalid type: width/height/health is not a number");
    }

    this.#width = width;
    this.#height = height;
    this.#health = health;
  }

  toString() {
    return super.toString() + `${this.#width} ${this.#height} ${this.#health}`;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  get health() {
    return this.#health;
  }

  set health(value) {
    if (!Number.isFinite(value)) {
      throw new TypeError(
        "Invalid value: health point must be a finite number",
      );
    }

    this.#health = value;
  }

  move() {
    // trigger physics to move
  }
}
