# Pragonauts Star Destroyer

Node.js code removal utility. 
Suitable to remove blocks of code from a large universal project.

The SD needs destoryer.config.json in the root of the project.



## Example of the config:

```json
{
    "blocksInUse": ["block2"],
    "blocks": {
        "block1": {
            "removed": false,
            "paths": [
                "directory/block1Directory",
                "block1FileA.js"
            ],
            "blockDependencies": ["block2"],
            "dependencies": ["smallest", "greatest"],
            "devDependencies": ["individual"]
        },
        "block2": {
            "removed": false,
            "dependencies": ["greatest"]
        }
    },
    "ignore": [
        "node_modules/**"
    ]
}
```

### Config properties
- `blocksInUse` - array of block names that should be kept in time of ```sd destroy``` call.
- `blocks` - map of all block configuration objects
- `blocks[BLOCKNAME].removed` - READ ONLY PROPERTY. Do not use 
    


## Commands usage:

### `sd destroy [BLOCKNAME]`

The command will remove all BLOCKNAME instances in the project. 
That means the SD will:

1. iterate all blocks defined in the config and check if there are no other blocks depending to the block. 
    The dependencies can be stored in ```blockDependencies``` property of the block config objects.

2. search the ```// $$BLOCKNAME``` in line endings and adds ```//``` prefix for all lines  
    *Example:*  
    ```var a = 10; // $$BLOCKNAME```  
    will be replaced by  
    ```// var a = 10; // $$BLOCKNAME```
    
3. search the blocks of code started with 
```/** $$BLOCKNAME */``` or ```// $$BLOCKNAME BEGIN```
and ending with ```/** $$BLOCKNAME END */``` or ```// $$BLOCKNAME END``` 
and comment all non-empty lines in the block.  
    *Example:*
    ```javascript
    // $$BLOCK1 BEGIN
    var a = 999;
    console.log('abcdefg');
 
    // $$BLOCK1 END
     ```
    will be replaced by
    ```javascript
    // $$BLOCK1 BEGIN
    // var a = 999;
    // console.log('abcdefg');
 
    // $$BLOCK1 END
     ```
     
 4. rename all files and folders present in the ```paths``` directory to have ```REMOVED_``` prefix
 
 5. uninstall all npm modules present in the ```dependencies``` and ```devDependencies``` **WITHOUT --save or --save-dev** flag.

 
### `sd destroy` (without [BLOCKNAME])

The command will read all blocks defined in ```blocks``` object and removes all blocks not present in the ```blocksInUse``` array.


### `sd clean`

The `sd destroy` command just comments all removing blocks and renames files. 
The `sd clean` is used for final project clean. The command will:

1. find and DELETE all block instances in the project that are marked as ```removed``` by previous ```sd destroy``` calls. 

2. removes the files present in the ```path``` property of all previously removed blocks.

3. uninstall all npm modules present in the ```dependencies``` and ```devDependencies``` **WITH --save or --save-dev** flag.

4. remove all block configs previously marked as removed from the config file.
