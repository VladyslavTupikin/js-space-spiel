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

import { Gun } from "./gun.js";
import { Point } from "../engine/point.js";
import { Database } from "../engine/db.js";
import { Animation } from "../engine/animation.js";

export class PistolGun extends Gun {
  constructor(db, position, ammo, durability) {
    super(db, position, ammo, durability);
  }

  async fire(playerID) {
    const targetFps = 30;
    const frameDuration = 1000 / targetFps; // ~33.33ms

    const renderNode = this.db.GetRenderModel(this.id);
    if (!renderNode) {
      throw new Error("Gun render not found!");
    }

    const playerObject = this.db.GetGameObject(playerID);
    this.center.y = playerObject.center.y;
    this.center.x = playerObject.center.x;

    // const initialPostition = playerObject.center.y;
    renderNode.object.isVisible = true;

    const animationCB = () => {
      renderNode.object.isVisible = true;

      this.center.y = this.center.y - 10;
      if (this.center.y <= 0) {
        renderNode.object.isVisible = false;
        this.center.y = playerObject.center.y;
        this.center.x = playerObject.center.x;
        return true;
      }
    };

    const animation = new Animation(this.db);
    animation.Animate(animationCB);
  }
}
