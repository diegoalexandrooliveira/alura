"use strict";

System.register([], function (_export, _context) {
  "use strict";

  return {
    setters: [],
    execute: function () {
      if (!Array.prototype.includes) {
        Array.prototype.includes = function (elemento) {
          return this.indexOf(elemento) != -1;
        };
      }
    }
  };
});
//# sourceMappingURL=es6.js.map