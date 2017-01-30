import React from 'react';

export default () => {
    return (<ul>

        <li>Some BLOCK1 navigation item</li> {/* $$BLOCK1 */}
        <li>Some other BLOCK1 {/* Some inner comment */} navigation item</li> {/* $$BLOCK1 */}

        <li>Some navigation item</li>

        {/* $$BLOCK1 */}
        <li>Some other BLOCK1 {/*Some inner comment*/} navigation item</li>

        <li>Some other other BLOCK1 navigation item</li>
        {/* $$BLOCK1 END */}

    </ul>);
};
