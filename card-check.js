// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]
const valid6 = [4, 5, 3, 9, 6, 8, 9, 8, 8, 7, 7, 0, 5, 7, 9, 8]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [7, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]


//Strings
const strNum1='6304508803447780';
const strNum2='6011137411829613765';
const strNum3='2720992414847767';
const strNum4='6011127961777935';

// An array of all the arrays above
let batch = [strNum1,strNum2,strNum3,strNum4,valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5]
let strBatch = [strNum1,strNum2,strNum3,strNum4];

//Convert string card type to array
const strToArr = str => str.split('').map(Number);


// Func Validate cards numbers
const validateCred = elem => {

	if (typeof elem === 'string') {
		elem = strToArr(elem);
	}
	let revArr = elem.slice().reverse();
	let lastDigit = revArr.splice(0, 1)[0];
	let result = revArr
					.map((elem,index) => index%2===0 ? (elem * 2 > 9 ? elem*2-9 : elem*2) : elem)
					.reduce((a,b) => a+b,lastDigit)%10===0;			
	return result;
};

// Func Get array of all invalid cards
const findInvalidCards = arr => arr.filter(elem => !validateCred(elem)?elem:null);

// Func Get array of company names on invalid cards
const idInvalidCardCompanies = arr => {
	let companiesArr = [];
	for(let elem of arr){

		switch(Number.parseInt(elem[0])){
			case 3: {
				if(companiesArr.indexOf('Amex (American Express)')===-1){
					companiesArr.push('Amex (American Express)');
				}
				break;
			}
			case 4: {
				if(companiesArr.indexOf('Visa')===-1){
					companiesArr.push('Visa');
				}
				break;
			}
			case 5: {
				if(companiesArr.indexOf('Mastercard')===-1){
					companiesArr.push('Mastercard');
				}
				break;
			}
			case 6: {
				if(companiesArr.indexOf('Discover')===-1){
					companiesArr.push('Discover');
				}
				break;
			}
			default: {
				console.log('Company not found');
			}
		}
	}
	return companiesArr;	
};

const convertToValid = elem => {
	if (typeof elem === 'object') {
		elem = elem[0];
	}

	if (typeof elem === 'string') {
		elem = strToArr(elem);
	}
	let revArr = elem.slice().reverse();
	let lastDigit = revArr.splice(0, 1)[0];
	let sum = revArr
					.map((elem,index) => index%2===0 ? (elem * 2 > 9 ? elem*2-9 : elem*2) : elem)
					.reduce((a,b) => a+b,lastDigit);	
	if (sum%10!==0) {
		elem = elem.join('')*1+(100-sum);
		return elem;
	}else{
		return 'Card number is valid! :)';
	}						
}


// Test code

console.log(idInvalidCardCompanies(findInvalidCards(batch)));
console.log(idInvalidCardCompanies(findInvalidCards(strBatch)));

console.log(convertToValid(findInvalidCards(strBatch)));
console.log(convertToValid(strNum2));

console.log(validateCred(strNum4));
console.log(validateCred(invalid2));
console.log(validateCred(valid3));
