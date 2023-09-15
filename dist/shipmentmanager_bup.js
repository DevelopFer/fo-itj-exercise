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
exports.ShipmentManager = void 0;
const EVEN_MULTIPLIER = 1.5;
const ODD_MULTIPLIER = 1;
const INCREASE_PERCENTAGE = 1.5;
class ShipmentManager {
    constructor() {
        this.getStreetName = (fullAddress) => {
            const aux = fullAddress.split(",");
            return aux[0];
        };
        this.lengthIsEven = (stringChain) => {
            return stringChain.length % 2 === 0;
        };
        this.countVowels = (stringChain) => {
            let totalVowels = 0;
            for (let letter of stringChain.toLowerCase()) {
                if (letter in this.vowels) {
                    totalVowels += 1;
                }
            }
            return totalVowels;
        };
        this.countConsonants = (stringChain) => {
            let totalConsonants = 0;
            for (let letter of stringChain.toLowerCase()) {
                if (!(letter in this.vowels)) {
                    totalConsonants += 1;
                }
            }
            return totalConsonants;
        };
        this.countFactors = (stringChain) => {
            let factors = {};
            for (let i = 2; i <= stringChain.length; i++) {
                if ((stringChain.length % i) === 0) {
                    factors[i] = i;
                }
            }
            return factors;
        };
        /**
         * If the length of the shipment's destination street name is even, the base suitability score (SS)
         * is the number of vowels in the driver’s name multiplied by 1.5.
         */
        this.calculateEvenSs = (driverName) => {
            const totalVowels = this.countVowels(driverName);
            return totalVowels * EVEN_MULTIPLIER;
        };
        /**
         * If the length of the shipment's destination street name is odd, the base SS is the number of consonants
         * in the driver’s name multiplied by 1.
         */
        this.calculateOddSs = (driverName) => {
            const totalConsonants = this.countConsonants(driverName);
            return totalConsonants * ODD_MULTIPLIER;
        };
        /**
         * If the length of the shipment's destination street name shares any common factors (besides 1) with the
         * length of the driver’s name, the SS is increased by 50% above the base SS.
         */
        this.increasePercentageIfRequired = (streetName, driverName, ss) => {
            const streetFactors = this.countFactors(streetName);
            const driverFactors = this.countFactors(driverName);
            return Object.keys(streetFactors).some(factor => (factor in driverFactors)) ? (ss += ss * INCREASE_PERCENTAGE) : ss;
        };
        this.evaluatePair = (streetAddress, driverName) => __awaiter(this, void 0, void 0, function* () {
            const streetName = this.getStreetName(streetAddress);
            let ss = -Infinity;
            if (this.lengthIsEven(streetName)) {
                ss = this.calculateEvenSs(driverName);
            }
            else {
                ss = this.calculateOddSs(driverName);
            }
            ss = this.increasePercentageIfRequired(streetName, driverName, ss);
            return ss;
        });
        this.setDriversList = (driversList) => {
            this.driversList = driversList;
        };
        /** Heaps Algorithm */
        this.generatePermutations = (elements) => __awaiter(this, void 0, void 0, function* () {
            const permutations = [];
            const swap = (array, p1, p2) => {
                let temp = array[p1];
                array[p1] = array[p2];
                array[p2] = temp;
            };
            const heapsPermute = (array, n, gp) => __awaiter(this, void 0, void 0, function* () {
                let j;
                if (n === 1)
                    return gp.push([...array]);
                for (let i = 1; i <= n; i++) {
                    heapsPermute(array, n - 1, gp);
                    j = (n % 2 === 0) ? 1 : i;
                    swap(array, j - 1, n - 1);
                }
            });
            yield heapsPermute(elements, elements.length, permutations);
            this.permutations = permutations;
        });
        this.vowels = { "a": 1, "e": 1, "i": 1, "o": 1, "u": 1 };
        this.maxSs = -Infinity;
        this.table = [];
        this.permutations = [];
    }
}
exports.ShipmentManager = ShipmentManager;
;
//# sourceMappingURL=shipmentmanager_bup.js.map