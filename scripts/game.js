/*
game.js: Main script for running game logic.
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

import { Database } from "./modules/db.js";
import { PlayerShip } from "./modules/player-ship.js";
import { Style } from "./modules/style.js";
import { RenderModel } from "./modules/render-model.js";
import { Point } from "./modules/point.js";
import { CollisionModel } from "./modules/collision-model.js";
import { Map } from "./modules/map.js";
import { Stats } from "./modules/stats.js";
import { TreeNode } from "./modules/tree-node.js";
import { RenderEngine } from "./modules/render-engine.js";
import { InputManager } from "./modules/input-manager.js";
import { EnemyShip } from "./modules/enemy-ship.js";

const db = new Database();

const gameContainerSelector = "game-container";

function main() {
  //console.log("Game started");

  /*-- Map -- */
  const newMap = new Map(650, 800);
  const newMapCollisionModel = new CollisionModel(
    newMap.id,
    Math.max(newMap.width, newMap.height) / 2,
    new Point(0, 0),
  );
  const newMapRenderModel = new RenderModel(db, newMap.id, false, "map");

  db.AddObjects(newMap, newMapCollisionModel, newMapRenderModel);

  /*-- Player -- */
  const player = new PlayerShip(db, 50, 50, new Point(300, 700), 2);
  const playerCollisionModel = new CollisionModel(
    player.id,
    Math.max(player.width, player.height) / 2,
    player.getCurrentPosition(),
  );
  const playerRenderModel = new RenderModel(db, player.id, true, "player-ship");

  db.AddObjects(
    player,
    playerCollisionModel,
    playerRenderModel,
    newMapRenderModel.styleClass,
  );

  /*-- Statistics -- */
  const stats = new Stats(200, 500);
  const newStatsCollisionModel = new CollisionModel(
    stats.id,
    Math.max(stats.width, stats.height) / 2,
    new Point(0, 0),
  );
  const newStatsRenderModel = new RenderModel(db, stats.id, false, "stats");

  db.AddObjects(stats, newStatsCollisionModel, newStatsRenderModel);

  /*-- Enemy -- */
  const enemy = new EnemyShip(db, 50, 50, new Point(300, 0), 1);
  const enemyCollisionModel = new CollisionModel(
    enemy.id,
    Math.max(player.width, player.height) / 2,
    enemy.getCurrentPosition(),
  );
  const enemyRenderModel = new RenderModel(db, enemy.id, true, "enemy-ship");

  db.AddObjects(
    enemy,
    enemyCollisionModel,
    enemyRenderModel,
    newMapRenderModel.styleClass,
  );

  /* Static render for debug puproses */
  //   newMapRenderModel.renderObject();
  //   playerRenderModel.renderObject();
  //   newStatsRenderModel.renderObject();
  //   enemyRenderModel.renderObject();

  const renderEngine = new RenderEngine(db);
  renderEngine.startRenderEngine();

  const inputManager = new InputManager(db, player.id);
  inputManager.InitMovement();
}

main();
