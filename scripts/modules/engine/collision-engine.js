/*
collision-engine.js: Module describes collision engine class.
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

import { CollisionModel } from "./collision-model.js";
import { Database } from "./db.js";
import { Point } from "./point.js";

export class CollisionEngine {
  static #instance = null;
  #db;
  #isDetecting;
  #map;

  constructor(db) {
    if (CollisionEngine.#instance) {
      return CollisionEngine.#instance;
    }

    if (!(db instanceof Database)) {
      throw new TypeError(
        "Invalid type: parameter db must be an instance of Database",
      );
    }

    this.#db = db;
    this.#map = db.GetGameObjectByName("map");
    CollisionEngine.#instance = this;
  }

  toString() {
    return ``;
  }

  async startCollisionEngine() {
    if (this.#isDetecting) return; // Prevent multiple loops from running simultaneously
    this.#isDetecting = true;

    const targetFPS = this.#db.limiterFPS;
    const frameDuration = 1000 / targetFPS; // ~33.33ms

    // const renderCB = (node) => {
    //   if (node.object) {
    //     node.object.renderObject();
    //   }
    // };

    while (this.#isDetecting) {
      const startTime = performance.now();

      try {
        // Await the asynchronous DFS traversal execution
        //this.#db.renderModels.dfs(this.#db.renderModels, renderCB);
        this.#verifyMovement();
      } catch (error) {
        console.error(
          "Collision Engine encountered an error during Collision detection:",
          error,
        );
      }

      // Calculate how long the execution took
      const executionTime = performance.now() - startTime;
      // Calculate how much time is left to maintain 30 FPS
      const remainingTime = Math.max(0, frameDuration - executionTime);

      // Wait out the remaining time for this frame
      await new Promise((resolve) => setTimeout(resolve, remainingTime));
    }
  }

  #verifyMovement() {
    for (const obj of this.#db.gameObjects) {
      const playerCollisionModel = this.#db.GetCollisionModel(obj.id);

      if (!playerCollisionModel) {
        continue;
      }

      const playerRenderModel = this.#db.GetRenderModel(obj.id);

      if (this.#isMapBoundariesValid(obj, playerCollisionModel)) {
        obj.center.x = playerCollisionModel.center.x;
        obj.center.y = playerCollisionModel.center.y;
      } else {
        playerCollisionModel.center.x = obj.center.x;
        playerCollisionModel.center.y = obj.center.y;
      }
    }
  }

  #isMapBoundariesValid(player, playerCollision) {
    const mapStartPoint = this.#map.center;
    const mapEndPoint = new Point(
      this.#map.width + mapStartPoint.x,
      this.#map.height + mapStartPoint.y,
    );

    if (
      playerCollision.center.x >= mapStartPoint.x &&
      playerCollision.center.x < mapEndPoint.x &&
      playerCollision.center.y >= mapStartPoint.y &&
      playerCollision.center.y < mapEndPoint.y
    ) {
      return true;
    }

    //console.log("Map boundary");
    return false;
  }
}
