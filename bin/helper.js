
var fs = require('fs');
var path = require('path');


function readDirectory(filepath){
    const content = fs.readdirSync(filepath, 'utf8');
    return content;
}


function extractRouteList(filePath){
    const data =  fs.readFileSync(filePath, {encoding: 'utf-8'});
    const routesList = extractRoutes(data);    
    return routesList;
}

function extractRoutes(fileData){
    let routes = fileData.split('\n')
        routes = routes.filter(route =>route.startsWith('router'));      
         
        const objList = routes.map(route =>{                    
            const regexForMethod = /\.\w+\(/; //regex -> starts with . and ends with (
            const methodArr = route.match(regexForMethod);
            const method = methodArr[0].substring(1,methodArr[0].length-1);

            const regexForUrl = /'([^']*)'/g; // regex -> anything inside quotes
            const urlArr = route.match(regexForUrl);
            const url = urlArr[0].substring(1,urlArr[0].length-1);

                        
            const controllerArr = route.split(',');
            let controllers = controllerArr.slice(1);
            controllers = controllers.map( ele =>{
                if(ele.includes(');')){
                    return ele.substring(0, ele.length-2)
                }
                else {
                    return ele;
                }
            })
            return {
                method : method,
                url : url,
                controllers : controllers,                
            }
        })       
        return objList;
}

module.exports ={
    extractRouteList,extractRoutes,readDirectory
}