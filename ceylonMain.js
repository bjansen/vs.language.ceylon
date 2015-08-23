'use strict';
define(["require", "exports", './ceylonDef', 'monaco'], function (require, exports, languageDef, monaco) {
    monaco.Modes.registerMonarchDefinition('ceylon', languageDef.language);
});
