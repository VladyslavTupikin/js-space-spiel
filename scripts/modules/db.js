/*
db.js: Module describes global database class.
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

import { PlayerShip } from "./player-ship.js";
import { CollisionModel } from "./collision-model.js";
import { RenderModel } from "./render-model.js";
import { EnemyShip } from "./enemy-ship.js";
import { Map } from "./map.js";
import { Stats } from "./stats.js";

export class Database {
  static #instance = null;
  #collisionModels;
  #renderModels;
  #players;
  #enemies;
  #map;
  #stats;

  constructor() {
    if (Database.#instance) {
      return Database.#instance;
    }

    Database.#instance = this;
    this.#collisionModels = new Set();
    this.#renderModels = new Set();
    this.#players = new Set();
    this.#enemies = new Set();
  }

  toString() {
    return ``;
  }

  AddCollisionModel(object) {
    if (!(object instanceof CollisionModel)) {
      throw new TypeError(
        "Invalid type: parameter object must be an instance of CollisionModel",
      );
    }

    this.#collisionModels.add(object);

    return true;
  }

  RemoveCollisionModel(id) {}

  AddRenderModel(object) {
    if (!(object instanceof RenderModel)) {
      throw new TypeError(
        "Invalid type: parameter object must be an instance of CollisionModel",
      );
    }

    this.#renderModels.add(object);

    return true;
  }

  RemoveRenderModel(id) {}

  AddPlayer(object) {
    if (!(object instanceof PlayerShip)) {
      throw new TypeError(
        "Invalid type: parameter object must be an instance of PlayerShip",
      );
    }

    this.#players.add(object);

    return true;
  }

  RemovePlayer(id) {}

  AddEnemy(object) {
    if (!(object instanceof EnemyShip)) {
      throw new TypeError(
        "Invalid type: parameter object must be an instance of PlayerShip",
      );
    }

    this.#enemies.add(object);

    return true;
  }

  RemoveEnemy(id) {}

  GetCollisionModel(id) {
    if (!Number.isFinite(id)) {
      throw new TypeError("Invalid type: parameter id is not a number");
    }

    for (const model of this.#collisionModels) {
      if (model.id === id) {
        return model;
      }
    }

    return null;
  }

  GetRenderModel(id) {}

  GetPlayer(id) {}

  AddMap(map) {
    if (!(map instanceof Map)) {
      throw new TypeError(
        "Invalid type: parameter map must be an instance of Map",
      );
    }

    this.#map = map;

    return true;
  }

  AddStats(stats) {
    if (!(stats instanceof Stats)) {
      throw new TypeError(
        "Invalid type: parameter stats must be an instance of Stats",
      );
    }

    this.#stats = stats;

    return true;
  }

  get map() {
    return this.#map;
  }

  get stats() {
    return this.#stats;
  }
}
