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

export class EnemyShip extends Ship {
  //#listeners;
  static #healthMultiplier = 1;

  constructor(width, height, center, health, stylePath) {
    const hp = health * EnemyShip.#healthMultiplier;
    const id = 1 + Math.random() * 10;
    super(width, height, center, hp, stylePath);

    //this.#listeners = new Set();
  }

  toString() {
    return `super.toString()`;
  }

  //   addMoveListener(OnMoveListener) {
  //     this.#listeners.add(OnMoveListener);
  //     return true;
  //   }

  //   removeoveListener(OnMoveListener) {
  //     return this.#listeners.delete(OnMoveListener);
  //   }
}
