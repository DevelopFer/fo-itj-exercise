import {it, expect, describe, beforeEach, expectTypeOf, beforeAll} from 'vitest';
import { faker } from '@faker-js/faker';
import { ShipmentManager } from '../dist/shipmentmanager';


let shipmentManager;

const totalFakeAddresses = 10;
const totalFakeDrivers = 10;

beforeAll( () => {
    
    shipmentManager = new ShipmentManager();
    
});

describe("Unit Tests", () => {

    it("should instanciate a ShipmenManager", () => {
        
        expect(shipmentManager.constructor.name).toEqual("ShipmentManager");

    });
    
    it('should generate combinations',async () => {

        const letters = ['a','e','i','o','u'];
        const numbers = ["1","2","3","4","5"];
        const combinations = [
            'a1', 'a2', 'a3', 'a4', 'a5',
            'e1', 'e2', 'e3', 'e4', 'e5',
            'i1', 'i2', 'i3', 'i4', 'i5',
            'o1', 'o2', 'o3', 'o4', 'o5',
            'u1', 'u2', 'u3', 'u4', 'u5'
        ];
        const dictionary = [];
        
        const buildCombinations = (arr1, arr2, dictionary, callback) => {
            const currentElement = arr1.shift();
            for( let element of arr2 ){
                dictionary.push(`${currentElement}${element}`);
            }
            if( ! arr1.length ) return dictionary;
            return buildCombinations(arr1,arr2, dictionary);
        };
        const result = buildCombinations(letters, numbers, dictionary);
        
        expect(combinations).toMatchObject(result);

    });

    const generateAddresses = (number) => {
        const addresses = [];
        for(let i = 0; i < number; i++){
            const streeName = faker.address.streetAddress();
            const zipCode   = faker.address.zipCode();
            const state     = faker.address.state();
            const city      = faker.address.city();
            addresses.push(`${streeName}, ${city}, ${state} ${zipCode}`);
        }
        return addresses;
    };

    const generateDrivers = (number) => {
        const names = [];
        for(let i = 0; i < number; i++){
            const name = faker.name.fullName();
            names.push(name);
        }
        return names;
    };


    it("should return only street name from an address", () => {
        
        const streeName = faker.address.streetAddress();
        const zipCode   = faker.address.zipCode();
        const state     = faker.address.state();
        const city      = faker.address.city();
        const address = `${streeName}, ${city}, ${state} ${zipCode}`;

        const onlyStreetName = shipmentManager.getStreetName(address);

        expect(onlyStreetName).toEqual(streeName);

    });    

    it("should return true if an string has an even length", () => {
        
        const demoString = "thisisanevenstring";
        
        const isEven = shipmentManager.lengthIsEven(demoString);
        
        expect(isEven).toBe(true);
    });

    it("should return false if an string has an odd length", () => {
        
        const demoString = "thisisanoddstring";
        
        const isEven = shipmentManager.lengthIsEven(demoString);
        
        expect(isEven).toBe(false);
    });

    it("should count only vowels", () => {
        
        const stringWithVowels = "MuRcIElaGO";
        
        const totalVowels = shipmentManager.countVowels(stringWithVowels);
        
        expect(totalVowels).toBe(5);
    });

    it("should count only consonants", () => {
        
        const stringWithConsonants = "CIrcUNSCribir";
        
        const totalConsonants = shipmentManager.countConsonants(stringWithConsonants);
        
        expect(totalConsonants).toBe(9);

    });

    it("should count factors", () => {
        
        //20 => [2,4,5,10,20]
        const stringChain = "istwentylengthstring";
        
        const totalFactors = shipmentManager.countFactors(stringChain);
        
        expect(Object.keys(totalFactors).length).toBe(5);

    });

    it("should generate permutations", async () => {
        
        const elements = ["a","b","c","d","e","f","g","h","i"];

        await shipmentManager.generatePermutations(elements);
        
        expect(shipmentManager.permutations.length).toBe(362880);
        
    });


    it("should generate permutations using drivers", async () => {
        
        const elements = generateDrivers(3);

        await shipmentManager.generatePermutations(elements);
      
        expect(shipmentManager.permutations.length).toBe(6);
        
    });

});