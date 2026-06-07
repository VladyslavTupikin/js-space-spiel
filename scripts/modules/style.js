/*
style.js: Module describes styles from CSS.
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

export class Style {
  #styleClass;
  #stylecss;

  constructor(styleClass) {
    if (typeof styleClass !== "string" || styleClass.length === 0) {
      throw new TypeError(
        "Invalid type: parameter styleClass must be a valid HTML class String",
      );
    }

    this.#styleClass = styleClass;
    //this.#stylesCSS = Style.loadStyle(pathToStyle);
  }

  toString() {
    return `${this.#styleClass} ${this.#stylecss}`;
  }

  static loadStyle(styleClass) {
    const styleElement = document.querySelector(styleClass);
    const styleContent = window.getComputedStyle(styleElement);
    if (styleContent) {
      this.#styleClass = styleContent;
    }

    return false;
  }

  get styleClass() {
    return this.#styleClass;
  }

  set styleClass(path) {
    this.#styleClass = path;
  }

  get stylecss() {
    return this.#stylecss;
  }
}
