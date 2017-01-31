'use strict';

const fs = require('fs');

console.log('HAHAHAAA'); // $$BLOCK1
let a = 10;              // $$BLOCK1
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
    console.log('Some codeeee 2'); // $$BLOCK9
    console.log('Some codeeee');

    // $$BLOCK1 BEGIN
    console.log('HAHAHAAA');
    console.log('HAHAHAAA');

    console.log('HAHAHAAA');
    console.log('HAHAHAAA');
    // $$BLOCK1 END

    /** $$BLOCK9 */

    console.log('HAHAHAAA 222');
    console.log('HAHAHAAA 22');
    /** $$BLOCK9 END */

    console.log('Some codeeee2');
};
