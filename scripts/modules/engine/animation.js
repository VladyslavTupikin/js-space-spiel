/*
animation.js: Module describes Animation class.
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

export class Animation {
  #db;
  constructor(db) {
    if (!(db instanceof Database)) {
      throw new TypeError(
        "Invalid type: parameter db must be an instance of Database",
      );
    }

    this.#db = db;
  }

  async Animate(callback) {
    const targetFps = this.#db.limiterFPS;
    const frameDuration = 1000 / targetFps;

    let startTime = performance.now();

    while (true) {
      await new Promise(requestAnimationFrame);

      if (callback()) {
        break;
      }

      // Calculate elapsed time to ensure 30 FPS constraint
      const elapsed = performance.now() - startTime;
      const sleepTime = frameDuration - elapsed;

      if (sleepTime > 0) {
        await new Promise((resolve) => setTimeout(resolve, sleepTime));
      }

      // Reset timer for next frame
      startTime = performance.now();
    }
  }
}
