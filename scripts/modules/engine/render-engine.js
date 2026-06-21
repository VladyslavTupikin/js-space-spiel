/*
render-engine.js: Module describes render engine class.
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

export class RenderEngine {
  static #instance = null;
  #db;
  #isRendering = false; // Tracks the state of the render loop

  constructor(db) {
    if (RenderEngine.#instance) {
      return RenderEngine.#instance;
    }

    if (!(db instanceof Database)) {
      throw new TypeError(
        "Invalid type: parameter db must be an instance of Database",
      );
    }

    RenderEngine.#instance = this;
    this.#db = db;
  }

  toString() {
    return `[object RenderEngine]`;
  }

  /**
   * Stops the continuous render loop.
   */
  stopRenderEngine() {
    this.#isRendering = false;
  }

  /**
   * Starts the continuous async render loop at limiterFPS FPS.
   */
  async startRenderEngine() {
    if (this.#isRendering) return; // Prevent multiple loops from running simultaneously
    this.#isRendering = true;

    const targetFPS = this.#db.limiterFPS;
    const second = 1000;
    const frameDuration = second / targetFPS;

    const renderCB = (node) => {
      if (node.object) {
        node.object.renderObject();
      }
    };

    while (this.#isRendering) {
      const startTime = performance.now();

      try {
        // Await the asynchronous DFS traversal execution
        this.#db.renderModels.dfs(this.#db.renderModels, renderCB);
      } catch (error) {
        console.error(
          "Render Engine encountered an error during DFS execution:",
          error,
        );
      }

      // Calculate how long the execution took
      const executionTime = performance.now() - startTime;

      // Calculate how much time is left to maintain limiterFPS FPS
      const remainingTime = Math.max(0, frameDuration - executionTime);

      // Wait out the remaining time for this frame
      await new Promise((resolve) => setTimeout(resolve, remainingTime));
    }
  }
}
