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

import { Database } from "./db.js";

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

  InitMovement() {
    window.addEventListener("keydown", (event) => {
      // Check if the pressed key is "a" or "A"
      if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
        console.log('The "A" key was pressed!');

        // Call whatever action or function you want here
        moveLeft(this.#db, this.#playerID);
      } else if (
        event.key === "d" ||
        event.key === "D" ||
        event.key === "ArrowRight"
      ) {
        console.log('The "D" key was pressed!');

        // Call whatever action or function you want here
        moveRight(this.#db, this.#playerID);
      } else if (
        event.key === "w" ||
        event.key === "W" ||
        event.key === "ArrowUp"
      ) {
        console.log('The "W" key was pressed!');

        // Call whatever action or function you want here
        moveUp(this.#db, this.#playerID);
      } else if (
        event.key === "s" ||
        event.key === "S" ||
        event.key === "ArrowDown"
      ) {
        console.log('The "S" key was pressed!');

        // Call whatever action or function you want here
        moveDown(this.#db, this.#playerID);
      }
    });

    const speed = 50;

    function moveLeft(db, id) {
      const pColMod = db.GetCollisionModel(id);
      db.RemoveCollisionModel(pColMod.id);
      pColMod.center.x = pColMod.center.x - speed;
      db.AddCollisionModel(pColMod);
    }

    function moveRight(db, id) {
      const pColMod = db.GetCollisionModel(id);
      db.RemoveCollisionModel(pColMod.id);
      pColMod.center.x = pColMod.center.x + speed;
      db.AddCollisionModel(pColMod);
    }

    function moveUp(db, id) {
      const pColMod = db.GetCollisionModel(id);
      db.RemoveCollisionModel(pColMod.id);
      pColMod.center.y = pColMod.center.y - speed;
      db.AddCollisionModel(pColMod);
    }

    function moveDown(db, id) {
      const pColMod = db.GetCollisionModel(id);
      db.RemoveCollisionModel(pColMod.id);
      pColMod.center.y = pColMod.center.y + speed;
      db.AddCollisionModel(pColMod);
    }
  }
}
