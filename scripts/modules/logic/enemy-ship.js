/*
enemy-ship.js: Module describes enemy ship as extension of Ship class.
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

import { Ship } from "./ship.js";
import { Database } from "../engine/db.js";

export class EnemyShip extends Ship {
  //#listeners;
  static #healthMultiplier = 1;
  #id;
  #db;

  constructor(db, width, height, center, health) {
    if (!(db instanceof Database)) {
      throw new TypeError(
        "Invalid type: parameter db must be an instance of Database",
      );
    }

    const hp = health * EnemyShip.#healthMultiplier;
    const id = db.GenerateID();
    super(id, width, height, center, hp);

    this.#db = db;
    this.#id = id;
  }

  toString() {
    return `super.toString()`;
  }
}
