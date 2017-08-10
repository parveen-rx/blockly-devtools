/**
 * @license
 * Blockly Demos: Block Factory
 *
 * Copyright 2017 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

goog.provide('WorkspaceContents');

goog.require('Resource');

/**
 * @class WorkspaceContents contains a set of positioned blocks specified by the
 * developer to load onto a Blockly workspace upon initialization.
 * @authors  Emma Dauterman (evd2014), sagev@google.com (Sage Vouse), celinechoo (Celine Choo)
 */
class WorkspaceContents extends Resource {
  /**
   * WorkspaceContents Class
   * @param {string} workspaceContentsName The name for the workspace contents.
   * @constructor
   */
  constructor(workspaceContentsName) {
    super(workspaceContentsName, PREFIXES.WORKSPACE_CONTENTS);

    /**
     * XML DOM element of this workspace contents.
     * @type {!Element}
     */
    this.xml = Blockly.Xml.textToDom('<xml></xml>');

    /**
     * Array of IDs of shadow blocks generated by user.
     * @type {!Array.<string>}
     */
    this.shadowBlocks = [];
  }

  /**
   * Sets XML of this instance of WorkspaceContents to given XML DOM element.
   * @param {!Element} xml XML DOM element to set.
   */
  setXml(xml) {
    // Moved in from wfactory_model.js:savePreloadXml(xml)
    this.xml = xml;
  }

  /**
   * Generates XML DOM element for WorkspaceContents. Used to insert
   * into files that user will download.
   *
   * @return {!Element} XML DOM element of this WorkspaceContents.
   */
  getExportData() {
    this.xml.setAttribute('id', this.name);
    return this.xml;
  }

  /**
   * Class for a ListElement
   * Adds a shadow block to the list of shadow blocks.
   * @param {string} blockId The unique ID of block to be added.
   */
  addShadowBlock(blockId) {
    // Moved in from wfactory_model.js
    if (this.shadowBlocks.indexOf(blockId) == -1) {
      this.shadowBlocks.push(blockId);
    }
  }

  /**
   * Removes a shadow block ID from the list of shadow block IDs if that ID is
   * in the list.
   * @param {string} blockId The unique ID of block to be removed.
   */
  removeShadowBlock(blockId) {
    // From wfactory_model.js:removeShadowBlock(blockId)
    for (let i = 0; i < this.shadowBlocks.length; i++) {
      if (this.shadowBlocks[i] == blockId) {
        this.shadowBlocks.splice(i, 1);
        return;
      }
    }
  }

  /**
   * Determines if a block is a shadow block given a unique block ID.
   * @param {string} blockId The unique ID of the block to examine.
   * @return {boolean} True if the block is a user-generated shadow block, false
   *     otherwise.
   */
  isShadowBlock(blockId) {
    // From wfactory_model.js
    for (let id of this.shadowBlocks) {
      if (id == blockId) {
        return true;
      }
    }
    return false;
  }
}
