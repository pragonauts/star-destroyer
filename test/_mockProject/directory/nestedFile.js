'use strict';

const fs = require('fs');

console.log('HAHAHAAA'); // $$BLOCK1
console.log('HAHAHAAA');

if (null) {
    console.log('HAHAHAAA'); // $$BLOCK1
}


module.exports = function () {

    /** $$BLOCK1 */
    console.log('HAHAHAAA');
    console.log('HAHAHAAA');

    console.log('HAHAHAAA');
    console.log('HAHAHAAA');
    /** $$BLOCK1 END */

};
