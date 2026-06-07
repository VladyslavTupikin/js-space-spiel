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

export class Stats {
  static #instance = null;
  #id;
  #width;
  #height;

  constructor(width = 600, height = 800) {
    if (Stats.#instance) {
      return Stats.#instance;
    }

    if (![width, height].every((p) => Number.isFinite(p))) {
      throw new TypeError(
        `Invalid type: width:${width} / height:${height} is not a number`,
      );
    }

    this.#id = Math.floor(100000 + Math.random() * 900000);
    this.#width = width;
    this.#height = height;
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
}
