/*
game-object.js: Module describes base game object for the game engine.
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

export class GameObject {
  #id;
  #db;
  #center;

  constructor(db, center) {
    if (!(db instanceof Database)) {
      throw new TypeError(
        "Invalid type: parameter db must be an instance of Database",
      );
    }

    if (!(center instanceof Point)) {
      throw new TypeError(
        "Invalid type: parameter point must be an instance of Point",
      );
    }

    this.#id = db.GenerateID();
    this.#db = db;
    this.#center = center;
  }

  toString() {
    return `${this.#id}` + this.#center.toString;
  }

  get id() {
    return this.#id;
  }

  get db() {
    return this.#db;
  }

  get center() {
    return this.#center;
  }
}
