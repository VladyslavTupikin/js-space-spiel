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
import { TreeNode } from "./tree-node.js";

const gameContainerClass = "game-container";

export class Database {
  static #instance = null;
  #collisionModels;
  #renderModels;
  #gameObjects;
  #limiterFPS = 30;

  constructor() {
    if (Database.#instance) {
      return Database.#instance;
    }

    Database.#instance = this;
    this.#collisionModels = new Set();
    this.#renderModels = new TreeNode(gameContainerClass, undefined);
    this.#gameObjects = new Set();
  }

  toString() {
    return ``;
  }

  AddObjects(game, collision, render, renderParent) {
    try {
      if (game) {
        this.AddGameObject(game);
      }
      if (collision) {
        this.AddCollisionModel(collision);
      }
      if (render) {
        this.AddRenderModel(render, renderParent);
      }
    } catch (error) {
      throw new Error(`Database: failed to add objects: ${error}`);
    }
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

  //   AddRenderModel(object) {
  //     if (!(object instanceof RenderModel)) {
  //       throw new TypeError(
  //         "Invalid type: parameter object must be an instance of CollisionModel",
  //       );
  //     }

  //     const node = new TreeNode(object.styleClass, object);
  //     this.#renderModels.addChild(node);

  //     return true;
  //   }

  AddRenderModel(object, parent) {
    if (!(object instanceof RenderModel)) {
      throw new TypeError(
        "Invalid type: parameter object must be an instance of CollisionModel",
      );
    }

    const node = new TreeNode(object.styleClass, object);

    if (parent) {
      const parentNode = this.#renderModels.getNode(parent);
      parentNode.addChild(node);
    } else {
      this.#renderModels.addChild(node);
    }

    return true;
  }

  RemoveRenderModel(id) {
    if (!Number.isFinite(id)) {
      throw new TypeError("Invalid type: parameter id is not a number");
    }

    for (const model of this.#collisionModels) {
      if (model.id === id) {
        this.#collisionModels.delete(model);
      }
    }

    return null;
  }

  AddGameObject(object) {
    if (typeof object !== "object") {
      throw new TypeError(
        "Invalid type: parameter object must be an object type",
      );
    }

    this.#gameObjects.add(object);
    return true;
  }

  GetGameObject(id) {
    if (!Number.isFinite(id)) {
      throw new TypeError("Invalid type: parameter id is not a number");
    }

    for (const gameObj of this.#gameObjects) {
      if (gameObj.id === id) {
        return gameObj;
      }
    }

    return null;
  }

  GetGameObjectByName(styleClass) {
    if (typeof styleClass !== "string" || styleClass.length === 0) {
      throw new TypeError(
        "Invalid type: parameter styleClass is not a valid HTML class",
      );
    }

    for (const model of this.#renderModels) {
      if (model.styleClass === styleClass) {
        return model;
      }
    }

    return null;
  }

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

  GenerateID() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  get collisionModels() {
    return this.#collisionModels;
  }

  get renderModels() {
    return this.#renderModels;
  }

  get gameObjects() {
    return this.#gameObjects;
  }

  get limiterFPS() {
    return this.#limiterFPS;
  }
}
