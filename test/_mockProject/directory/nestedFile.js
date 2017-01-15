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

    let a = 10;

    console.log('HAHAHAAA');
    console.log('HAHAHAAA');
    /** $$BLOCK1 END */

    console.log('Some codeeee');
    console.log('Some codeeee');

    console.log('Some codeeee2');
};
