/*
input-manager.js: File describes InputManager class.
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

export class InputManager {
  #db;
  #playerID;

  constructor(db, playerID) {
    if (!(db instanceof Database)) {
      throw new TypeError(
        "Invalid type: parameter db must be an instance of Database",
      );
    }

    if (!Number.isFinite(playerID)) {
      throw new TypeError("Invalid type: playerID is not a number");
    }

    this.#db = db;
    this.#playerID = playerID;
  }

  toString() {
    return ``;
  }

  startInputManager() {
    this.InitMovement();
    this.InitGunFire();
  }

  InitGunFire() {
    window.addEventListener("keydown", (event) => {
      if (event.key === " " || event.key === "Spacebar") {
        console.log(`space: FIRE!!!`);

        const player = this.#db.GetGameObject(this.#playerID);
        const gun = this.#db.GetGameObject(player.gunID);
        gun.fire(this.#playerID);
      }
    });
  }

  InitMovement() {
    window.addEventListener("keydown", (event) => {
      if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
        moveLeft(this.#db, this.#playerID);
      } else if (
        event.key === "d" ||
        event.key === "D" ||
        event.key === "ArrowRight"
      ) {
        moveRight(this.#db, this.#playerID);
      } else if (
        event.key === "w" ||
        event.key === "W" ||
        event.key === "ArrowUp"
      ) {
        moveUp(this.#db, this.#playerID);
      } else if (
        event.key === "s" ||
        event.key === "S" ||
        event.key === "ArrowDown"
      ) {
        moveDown(this.#db, this.#playerID);
      }
    });

    const speed = 50;

    function moveLeft(db, id) {
      const pColMod = db.GetCollisionModel(id);

      const newX = Number(pColMod.center.x - speed);

      pColMod.center.x = newX;
    }

    function moveRight(db, id) {
      const pColMod = db.GetCollisionModel(id);

      const newX = pColMod.center.x + speed;

      pColMod.center.x = newX;
    }

    function moveUp(db, id) {
      const pColMod = db.GetCollisionModel(id);

      const newY = pColMod.center.y - speed;

      pColMod.center.y = newY;
    }

    function moveDown(db, id) {
      const pColMod = db.GetCollisionModel(id);

      const newY = pColMod.center.y + speed;

      pColMod.center.y = newY;
    }
  }
}
