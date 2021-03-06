'use strict';

const { execFileSync } = require('child_process');
const fs = require('fs');
const ncp = require('ncp');
const rimraf = require('rimraf');
const assert = require('assert');

function readFsStructure (filename) {
    const stats = fs.lstatSync(filename);

    if (stats.isDirectory()) {
        return fs.readdirSync(filename).reduce(function (dir, child) {
            // eslint-disable-next-line no-param-reassign
            dir[child] = readFsStructure(`${filename}/${child}`);
            return dir;
        }, {});
    }
    return fs.readFileSync(filename, 'utf8');
}


describe('starDestroyer', function () {

    this.timeout(5000);

    const projectPath = `${__dirname}/mockProject`;
    let structureBefore;

    /**
     * @param {...string} args
     */
    function callDestroyer (...args) {
        try {
            execFileSync('node', [`${__dirname}/../bin/sd`, ...args], {
                cwd: projectPath
            });
        } catch (err) {
            throw err;
        }
    }

    beforeEach(function (done) {

        if (fs.existsSync(projectPath)) {
            rimraf.sync(projectPath, { disableGlob: true });
        }

        const templatePath = `${__dirname}/_mockProject`;
        ncp(templatePath, projectPath, (err) => {

            if (err) {
                done(err);
                return;
            }

            structureBefore = readFsStructure(projectPath);
            done();
        });

    });

    describe('command "destroy BLOCKNAME"', function () {


        it('should throw when removing totally unknown block', function () {
            assert.throws(() => {
                callDestroyer('destroy', 'totallyUnknownBlock');
            }, (err) => {
                assert(err.toString().includes('The destroy.config.hjson does not contains block with name "totallyUnknownBlock"'));
                return true;
            });
            const structureAfter = readFsStructure(projectPath);
            assert.deepEqual(structureAfter, structureBefore);
        });

        it('should not edit anything but config when removing not utilized block', function () {
            callDestroyer('destroy', 'notUtilizedBlock');
            const resultStructure = readFsStructure(projectPath);
            // destroy.config.hjson should have added 'removed' -> true in notUtilizedBlock config
            const expectedStructure = readFsStructure(`${__dirname}/removedNotUtilizedBlockProject`);

            assert.deepEqual(resultStructure, expectedStructure);
        });

        it('should comment all occurrences of the BLOCK1', function () {

            /**
             * WHAT should happen
             * - all block instances are commented in the project files
             * - all folders specified in config has 'REMOVED_' prefix
             * - all files   specified in config has 'REMOVED_' prefix
             * - all dependencies of the block are removed if no other block needs them
             */
            callDestroyer('destroy', 'block1');

            const resultStructure = readFsStructure(projectPath);
            const expectedStructure = readFsStructure(`${__dirname}/removedBlock1Project`);

            assert.deepEqual(resultStructure, expectedStructure);

        });

        it('should prevent to remove block which is used as dependency any not-removed block', function () {
            assert.throws(() => {
                callDestroyer('destroy', 'block2');
            }, (err) => {
                assert(err.toString().includes('There are other blocks depending on'));
                return true;
            });
            const structureAfter = readFsStructure(projectPath);
            assert.deepEqual(structureAfter, structureBefore);
        });

    });

    describe('command "destroy" (blocksInUse usage)', function () {

        it('should destroy all blocks not present in the "blocksInUse" array', function () {
            callDestroyer('destroy');

            const resultStructure = readFsStructure(projectPath);
            const expectedStructure = readFsStructure(`${__dirname}/removedNotInUseBlocksProject`);

            assert.deepEqual(resultStructure, expectedStructure);
        });

    });


    describe('command "clean"', function () {

        it('should clean the project from all removed blocks and comments of not removed blocks', function () {

            callDestroyer('destroy', 'block1');
            callDestroyer('clean');

            const resultStructure = readFsStructure(projectPath);
            const expectedStructure = readFsStructure(`${__dirname}/cleanedBlock1Project`);

            assert.deepEqual(resultStructure, expectedStructure);
        });

    });

});

