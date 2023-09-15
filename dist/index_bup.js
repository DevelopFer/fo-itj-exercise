"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const readline = require('readline');
const list_1 = require("./list");
const shipmentmanager_1 = require("./shipmentmanager");
const validateParameters = () => {
    if (!('npm_config_addressfilepath' in process.env)) {
        console.error("addressFilePath parameter is required");
        process.exit(1);
    }
    if (!('npm_config_driversfilepath' in process.env)) {
        console.error("driversFilePath parameter is required");
        process.exit(1);
    }
};
const matchShipments = (addresses, manager, index) => __awaiter(void 0, void 0, void 0, function* () {
    manager.driversList.permute();
    let totalSs = 0;
    let scout = manager.driversList.head;
    let asignationTable = [];
    for (let i = 0; i < addresses.length; i++) {
        const ss = yield manager.evaluatePair(addresses[i], scout.value);
        totalSs += ss;
        asignationTable.push([addresses[i], scout.value]);
        scout = scout.next;
    }
    if (totalSs > manager.maxSs) {
        manager.maxSs = totalSs;
        manager.table = asignationTable;
    }
    if (index === 0)
        return { table: manager.table, maxSs: manager.maxSs };
    return matchShipments(addresses, manager, (index - 1));
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    validateParameters();
    const addressesPath = process.env.npm_config_addressfilepath;
    const driversPath = process.env.npm_config_driversfilepath;
    const shipments = fs.readFileSync(addressesPath, 'utf-8').split('\n').filter(Boolean);
    const drivers = fs.readFileSync(driversPath, 'utf-8').split('\n').filter(Boolean);
    const assignmentList = new list_1.List();
    for (let driver of drivers) {
        assignmentList.add(driver);
    }
    const shipmentmanager = new shipmentmanager_1.ShipmentManager();
    shipmentmanager.setDriversList(assignmentList);
    const response = yield matchShipments(shipments, shipmentmanager, assignmentList.size - 1);
    console.log(`Max SS: ${response.maxSs}`);
    //console.table(response.table);
});
main();
//# sourceMappingURL=index_bup.js.map