/*
tree-node.js: File describes common Tree data structure.
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

export class TreeNode {
  #name;
  #object;
  #children;

  constructor(name, object) {
    if (typeof name !== "string") {
      throw new TypeError("Invalid type: name must be a string");
    }

    this.#name = name;
    this.#children = [];
    this.#object = object;
  }

  addChild(node) {
    if (!(node instanceof TreeNode)) {
      throw new TypeError(
        "Invalid type: Tree Instance should be TreeNode type",
      );
    }

    this.#children.push(node);
  }

  dfs(node = this, callback) {
    if (!(node instanceof TreeNode)) {
      throw new TypeError(
        "Invalid type: Tree Instance should be TreeNode type",
      );
    }

    callback(node);

    if (node.children && node.children.length > 0) {
      node.children.forEach((child) => this.dfs(child, callback));
    }
  }

  //static getMyParent(childName)

  getParentNode(childName, parent) {
    if (childName === this.#name) {
      return parent;
    }

    for (const child of this.children) {
      const found = child.getParentNode(childName, this);
      if (found) {
        return found;
      }
    }

    return null;
  }

  getNode(nodeName) {
    if (nodeName === this.#name) {
      return this;
    }

    for (const child of this.children) {
      const found = child.getNode(nodeName);
      if (found) {
        return found;
      }
    }

    return null;
  }

  get children() {
    return this.#children;
  }

  get name() {
    return this.#name;
  }

  get object() {
    return this.#object;
  }
}
