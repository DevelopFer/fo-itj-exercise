import { List } from "./list";


const EVEN_MULTIPLIER = 1.5;
const ODD_MULTIPLIER  = 1;
const INCREASE_PERCENTAGE = 1.5;

export class ShipmentManager {
    
    vowels      : {[key:string]:number};
    table       : Array<[]>;
    maxSs       : number;
    driversList : List;
    permutations: Array<[]>;
    
    constructor(){

        this.vowels = {"a":1,"e":1,"i":1,"o":1,"u":1};
        this.maxSs = -Infinity;
        this.table = [];
        this.permutations = [];

    }

    getStreetName = ( fullAddress:string ): string => {
        
        const aux = fullAddress.split(",");
        return aux[0];

    }

    lengthIsEven = ( stringChain: string ): boolean => {

        return stringChain.length % 2 === 0;

    }

    countVowels = ( stringChain: string ): number => {
        let totalVowels = 0;
        for( let letter of stringChain.toLowerCase() ){
            if( letter in this.vowels ){
                totalVowels += 1;
            }
        }
        return totalVowels;
    }

    countConsonants = ( stringChain: string) => {
        let totalConsonants = 0;
        for( let letter of stringChain.toLowerCase() ){
            if( ! ( letter in this.vowels ) ){
                totalConsonants += 1;
            }
        }
        return totalConsonants;
    }
    
    countFactors = ( stringChain: string ): {[key:number]:number} => {
        let factors = {};
        for( let i = 2; i <= stringChain.length; i++){
            if( (stringChain.length % i) === 0 ){
                factors[i] = i;
            }
        }
        return factors;
    }

    /**
     * If the length of the shipment's destination street name is even, the base suitability score (SS) 
     * is the number of vowels in the driver’s name multiplied by 1.5.
     */
    calculateEvenSs = ( driverName: string ): number => {
        
        const totalVowels = this.countVowels(driverName);

        return totalVowels * EVEN_MULTIPLIER;
    }

    /**
     * If the length of the shipment's destination street name is odd, the base SS is the number of consonants 
     * in the driver’s name multiplied by 1.
     */
    calculateOddSs = (driverName: string ): number => {

        const totalConsonants = this.countConsonants(driverName);

        return totalConsonants * ODD_MULTIPLIER;

    }

    /**
     * If the length of the shipment's destination street name shares any common factors (besides 1) with the 
     * length of the driver’s name, the SS is increased by 50% above the base SS.
     */
    increasePercentageIfRequired = (streetName: string, driverName: string, ss: number ): number => {
        const streetFactors = this.countFactors(streetName);
        const driverFactors = this.countFactors(driverName);
        
        return Object.keys(streetFactors).some( factor => (factor in driverFactors) ) ? ( ss += ss * INCREASE_PERCENTAGE ) : ss;
        
    }   

    evaluatePair = async (streetAddress: string, driverName: string ) => {
        const streetName: string = this.getStreetName(streetAddress);
        let ss = -Infinity;
        if( this.lengthIsEven(streetName) ){
            ss = this.calculateEvenSs(driverName);
        }else{
            ss = this.calculateOddSs(driverName);
        }
        ss = this.increasePercentageIfRequired(streetName, driverName, ss);
        return ss;
    };
    
    setDriversList = (driversList:List): void => {
        this.driversList = driversList;
    };

    /** Heaps Algorithm */
    generatePermutations = async (elements: []): Promise<void> => {
        
        const permutations = [];
        
        const heapsPermute = async ( array, n, gp) => {
            let j;
            if( n === 1 ) return gp.push([...array]);
            for( let i = 1; i <= n; i++){
                heapsPermute(array, n-1, gp);
                j = ( n % 2 === 0 ) ? 1 : i;
                //Swap Two Array Elements by Destructuring
                [array[j-1],array[n-1]] = [array[n-1],array[j-1]]
                
            }
        };

        await heapsPermute(elements, elements.length, permutations)
        
        this.permutations = permutations;

    };


};  