/*
point.js: Simple class represents math accurate figure - point.
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

export class Point {
  #x;
  #y;

  constructor(x, y) {
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      throw new TypeError("Parameter must be an instance of Number");
    }

    this.#x = x;
    this.#y = y;
  }

  toString() {
    return `${this.#x} ${this.#y}`;
  }

  set x(value) {
    if (!Number.isFinite(value)) {
      throw new TypeError("Parameter must be an instance of Number");
    }

    this.#x = value;
  }

  get x() {
    return this.#x;
  }

  set y(value) {
    if (!Number.isFinite(value)) {
      throw new TypeError("Parameter must be an instance of Number");
    }

    this.#y = value;
  }

  get y() {
    return this.#y;
  }
}
