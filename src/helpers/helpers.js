/**
 * Create nested array from flat structure
 * @param {array} array - Flat array
 * @param {number} parent - Value of parent categoryId property
 * @return {array} Nested array
 */
export const getNestedChildren = (array, parent) => {
    const tempArr = [];
    for(let i in array) {        
        if(array[i].parentCategory === parent) {
            const categoryId = array[i].categoryId;
            tempArr.push(array[i]);
            delete array[i];
            let nodes = getNestedChildren(array, categoryId);
            
            if(nodes.length) {
                tempArr[tempArr.length-1].nodes = nodes;
            }
        }
    }
    return tempArr;
}

// export const getNestedChildren = (array, parent) => {
//     const output = [];
//     for(let i in array) {        
//         if(array[i].parentCategory === parent) {
//             let nodes = getNestedChildren(array, array[i].categoryId);
            
//             if(nodes.length) {
//                 array[i].nodes = nodes;
//             }
//             output.push(array[i]);
//         }
//     }
//     return output;
// }

/**
 * Group elements with same treatAsSport value
 * @param {number} treatAsSportId - Value of treatAsSport property
 * @param {string} name - Name of new element (grand parent) - categoryName property
 * @param {number} order - Order of new element (grand parent) - sordOrder property
 * @param {array} json - Flat json array
 * @return {array} Array contains new grand parent category
 */
export const groupByTreatAsSport = (treatAsSportId, name, order, json) => {
    let items = json,
        eventsCount = 0;

    // Set property paramCategory, level and count events in elements from json with treatAsSport == treatAsSportId
    for (let index = 0; index < items.length; index++) {
        if(items[index].treatAsSport === treatAsSportId) {
            items[index].parentCategory = treatAsSportId;
            items[index].level = 2;
            eventsCount += items[index].eventsCount;
        }   
    }

    if(eventsCount > 0){
        const categoryTemplate = [
            {
                "categoryId": treatAsSportId,
                "remoteId": 0,
                "categoryName": name,
                "level": 1,
                "parentCategory": 0,
                "sportId": treatAsSportId,
                "eventsCount": eventsCount,
                "sortOrder": order,
                "treatAsSport": 1,
                "categoryFlag": "null"
            },
        ];
        items = [...items, ...categoryTemplate];
    }
    return items;
}