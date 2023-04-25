#!/usr/bin/env node

const path = require('path');
var Table = require('cli-table');
const {extractRouteList, readDirectory} = require('./helper');

const rootDir = process.cwd();
const routesDir = path.join(rootDir, 'src/routes');
const routesContent = readDirectory(routesDir);

function extractAllRoutes(routesContent){
    return routesContent.map( item =>{
                if(item == 'index.js'){
                    itemPath = path.join(routesDir,item);
                    routelist = extractRouteList(itemPath);
                    return routelist;            
                }
                else{
                    itemPath = path.join(routesDir,`${item}/index.js`);
                    routelist = extractRouteList(itemPath);
                    return routelist;
                }
            });
}



var viewtable = new Table({
    head: ['Http verb', 'Route/path','Controller/Middlewares']
  , colWidths: [12, 50,80]
});


function createTable(allRoutes){
    allRoutes.map(table =>{
        table.map(row =>{    
            const val = Object.values(row);   
            //console.log(val);   
            viewtable.push(val);
        })
        console.log(viewtable.toString());
    })
}

const allRoutes = extractAllRoutes(routesContent);
createTable(allRoutes);