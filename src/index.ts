const fs = require('fs');
const readline = require('readline');

import { List } from "./list";
import { ShipmentManager } from "./shipmentmanager";


const validateParameters = () => {
    
    if( ! ('npm_config_addressfilepath' in process.env) ) {
        console.error("addressFilePath parameter is required");
        process.exit(1);
    }

    if( ! ('npm_config_driversfilepath' in process.env) ) {
        console.error("driversFilePath parameter is required");
        process.exit(1);
    }

}


const matchShipments = async (addresses: string[], manager: any, index:number) => {

    if( index === 0 ) return { table:manager.table,maxSs:manager.maxSs };
    
    const list = new List();
    for(let driver of manager.permutations.pop() ){
        list.add(driver);
    }

    manager.setDriversList(list);
    
    let totalSs         = 0;
    let scout           = manager.driversList.head;
    let asignationTable = [];
    
    for(let i = 0; i < addresses.length; i++){
        const ss = await manager.evaluatePair(addresses[i], scout.value);
        totalSs += ss;
        asignationTable.push([addresses[i],scout.value]);
        scout = scout.next;
    }
    // console.log(totalSs, manager.maxSs);
    // console.table(asignationTable);    
    if( totalSs > manager.maxSs ){
        manager.maxSs = totalSs;
        manager.table = asignationTable;
    }

    return matchShipments( addresses, manager, manager.permutations.length );
    
};

const main = async () => {
    
    validateParameters();
    
    const addressesPath = process.env.npm_config_addressfilepath;
    const driversPath   = process.env.npm_config_driversfilepath;
    
    const shipments     = fs.readFileSync(addressesPath, 'utf-8').split('\n').filter(Boolean);
    const drivers       = fs.readFileSync(driversPath, 'utf-8').split('\n').filter(Boolean);
    
    const shipmentManager = new ShipmentManager();
    await shipmentManager.generatePermutations(drivers);
    
    const response = await matchShipments( shipments, shipmentManager, (shipmentManager.permutations.length - 1) );

    console.log(`Max SS: ${response.maxSs}`);
    console.table(response.table);
}

main();

