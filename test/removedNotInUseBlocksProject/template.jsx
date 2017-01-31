import React from 'react';

export default () => {
    return (<ul>

        {/*<li>Some BLOCK1 navigation item</li>*/} {/* $$BLOCK1 */}
        {/*<li>Some other BLOCK1 {/* Some inner comment *!/ navigation item</li>*/} {/* $$BLOCK1 */}

        <li>Some navigation item</li>
        <li>Some block2 navigation item</li> {/* $$BLOCK9 */}
        <li>Some navigation item</li>

        {/* $$BLOCK1 */}
        {/*<li>Some other BLOCK1 {/*Some inner comment*!/ navigation item</li>*/}

        {/*<li>Some other other BLOCK1 navigation item</li>*/}
        {/* $$BLOCK1 END */}

        {/* $$BLOCK9 */}
        <li>2222</li>

        <li>2222 2222</li>
        {/* $$BLOCK9 END */}

    </ul>);
};
