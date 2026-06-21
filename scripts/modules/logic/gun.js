/*
gun.js: Module describes Gun base class.
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
import { GameObject } from "../engine/game-object.js";

export class Gun extends GameObject {
  #ammo;
  #durability;

  constructor(db, center, ammo = 1, durability = -1) {
    super(db, center);

    if (![ammo, durability].every((p) => Number.isFinite(p))) {
      throw new TypeError("Invalid type: ammo/durability is not a number");
    }

    this.#ammo = ammo;
    this.#durability = durability; // Default - Indestructible
  }

  toString() {
    return super.toString() + `${this.#ammo} ${this.#durability}`;
  }

  fire() {}

  get ammo() {
    return this.#ammo;
  }

  set ammo(value) {
    if (!Number.isFinite(value)) {
      throw new TypeError(`Invalid type: ammo shoiuld be a nbbumber`);
    }

    this.#ammo = Math.round(value());
  }
}
