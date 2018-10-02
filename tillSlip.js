// Ingredient Constructor

function Ingredient(name, inputUnit, portionUnit, portionSize, portionsPerInputUnit, costPerInputUnit, sellingPrice, costPerPortion) {
	this.name = name;
	this.inputUnit = inputUnit;
	this.portionUnit = portionUnit;
	this.portionSize = portionSize;
	this.portionsPerInputUnit = portionsPerInputUnit;
	this.portionsInStock = 0; 
	this.costPerInputUnit = costPerInputUnit;
	this.sellingPrice = sellingPrice;
	this.costPerPortion = costPerPortion;
}

Ingredient.prototype = {
	constructor: Ingredient,
	
	calcCostPerPortion: function() {
		this.costPerPortion =  this.costPerInputUnit / this.portionsPerInputUnit;
	},
    
   
	// Ingredient Object Mutators
	
	setName: function(newName) {
		this.name = newName;
	},
	setInputUnit: function(newInputUnit) {
		this.inputUnit = newInputUnit;
	},
	setPortionUnit: function(newPortionUnit) {
		this.portionUnit = newPortionUnit;
	},
	setPortionSize: function(newPortionSize) {
		this.portionSize = newPortionSize;
	},
	setPortionsPerInputUnit: function(newPortionsPerInputUnit) {
		this.portionsPerInputUnit = newPortionsPerInputUnit;
	},
	addPortions: function(increment) {
		this.portionsInStock = this.portionsInStock + increment;
    },
    usePortions: function(decrement) {
        this.portionsInStock = this.portionsInStock - decrement;
    },
	setSellingPrice: function(newSellingPrice) {
		this.sellingPrice = newSellingPrice;
	}
};

// Create Ingredient Objects

var chips = new Ingredient("Chips", "Kg", "g", 200, 5, 7, 0, 7.5);
var polony = new Ingredient("Polony", "Kg", "slices", 1, 50, 17.5, 1, 0.35);
var cheese = new Ingredient("Cheese", "Kg", "slices", 1, 72, 70, 2, 0.972);
var vienna = new Ingredient("Vienna", "Kg", "units", 1, 72, 60, 1.5, 0.833);
var russian = new Ingredient("Russian", "Kg", "units", 1, 24, 48, 4, 2);
var burger = new Ingredient("Burger", "Kg", "units", 1, 12, 30, 5, 3);
var bread = new Ingredient("Bread", "loaves", "slices", 4, 4.5, 10, 0, 2.22);

// Create a data structure that has old Ingredient items in it. 

var allIngredients = [chips, polony, cheese, vienna, russian, burger, bread];
	
	
// Menu Item Constructor: MenuItem

function MenuItem(name, ingredientList, sellingPrice) {
	this.name = name;
	this.ingredientList = ingredientList;
	this.sellingPrice = sellingPrice;
	this.costPrice = 0;
    this.profit = 0;
    this.quantitySold = 0;
}
	
MenuItem.prototype = {
	constructor: MenuItem,
	
	calcCostPrice: function() {
		for (let i = 0; i < this.ingredientList.length; i = i + 1) {
            this.costPrice = this.costPrice + this.ingredientList[i].costPerPortion;
		}
	},

	calcProfit: function() {
		this.profit = this.sellingPrice - this.costPrice;
	},
	
	// Menu Item Mutators
	
	setName: function(newName) {
		this.name = name;
	},
	setIngredientList: function(newIngredientList) {
		this.ingredientList = newIngredientList;
	},
	setSellingPrice: function(newSellingPrice) {
		this.sellingPrice = newSellingPrice;
	},
	addIngredientTo: function(newIngredient) {
		this.ingredientList[ingredientList.length] = newIngredient;
    }, 
    incrementSales: function(increment) {
        this.quantitySold = this.quantitySold + increment;
    }
};

// Create Menu Items

var starterPack = new MenuItem("Starter Pack", [bread, chips, cheese, polony], 13.00);
var contract = new MenuItem("Contract", [bread, chips, cheese, polony, vienna], 15.00);
var upgrade = new MenuItem("Upgrade", [bread, chips, cheese, polony, russian], 17.00);
var smartPhone = new MenuItem("Smart Phone", [bread, chips, cheese, polony, burger], 20.00);
var tablet = new MenuItem("Tablet", [bread, chips, cheese, polony, burger, russian], 22.00);
var extraPolony = new MenuItem("Extra Polony", [polony], 1.00);
var extraCheese = new MenuItem("Extra Cheese", [cheese], 2.00);
var extraVienna = new MenuItem("Extra Vienna", [vienna], 1.50);
var extraRussian = new MenuItem("Extra Russian", [russian], 4.00);
var extraBurger = new MenuItem("Extra Burger", [burger], 5.00);

// Initialize cost and profit attributes for newly created Menu Item Objects

starterPack.calcCostPrice();
starterPack.calcProfit();
contract.calcCostPrice();
contract.calcProfit();
upgrade.calcCostPrice();
upgrade.calcProfit();
smartPhone.calcCostPrice();
smartPhone.calcProfit();
tablet.calcCostPrice();
tablet.calcProfit();

// Create a data structure with all MenuItem(s) in it. 

var allMenuItems = [starterPack, contract, upgrade, smartPhone, tablet];

// Constructor: LineItem

function LineItem(menuItem) {
	this.name = menuItem.name;
	this.menuItem = menuItem;
	this.quantity = 0;
	this.unitPrice = menuItem.sellingPrice;
	this.cost = 0;
	this.quantityId = (menuItem.name + " Quantity");
	this.unitPriceId = (menuItem.name + " Unit Price");
	this.costId = (menuItem.name + " Cost");
}

LineItem.prototype = {
	constructor: LineItem,
	
	// LineItem Mutators
	
	rename: function(menuItem) {
		this.name = menuItem.name;
	},
	
	addQuantity: function(quantity) {
		this.quantity = this.quantity + quantity;
	},
	
	resetQuantity: function() {
		this.quantity = 0;
	},
	// checkQuantities compares the tillSlip.lineItems.quantity entered to ingredient.portionsInStock to see if the ingredients required to make a menu item are in stock.
	checkQuantities: function(quantity) {
		if (this.quantity === 0 && quantity < 0) {
			alert("Cannot order negative amounts, please revise your selection.");
		}
		else {
			for (let i = 0; i < this.menuItem.ingredientList.length; i = i + 1) {
				if (this.menuItem.ingredientList[i].portionsInStock < (quantity)) {
					alert("There are " + this.menuItem.ingredientList[i].portionsInStock + " portions of " + this.menuItem.ingredientList[i].name +" left. Please revise your selection.");
					tillSlip.flag = false;
					break;
				}
				else {
				tillSlip.flag = true;
				}
			}
		}
	},
	setUnitPrice: function() {
		this.unitPrice = this.menuItem.sellingPrice;
	},
	
	calcCost: function() {
		this.cost = this.unitPrice * this.quantity;
	},
};

// Create Line Items

var starterPackLineItem = new LineItem(starterPack);
var contractLineItem = new LineItem(contract);
var upgradeLineItem = new LineItem(upgrade);
var smartPhoneLineItem = new LineItem(smartPhone);
var tabletLineItem = new LineItem(tablet);
var polonyLineItem = new LineItem(extraPolony);
var cheeseLineItem = new LineItem(extraCheese);
var viennaLineItem = new LineItem(extraVienna);
var russianLineItem = new LineItem(extraRussian);
var burgerLineItem = new LineItem(extraBurger);


// Constructor: Till Slip

function TillSlip(lineItems) {
	this.lineItems = lineItems;
	this.total = 0;
	this.flag = false;
}

TillSlip.prototype = {
	// TillSlip Object Mutators
    
    calcTotal: function() {
		tillSlip.total = 0;
		for (let i = 0; i < tillSlip.lineItems.length; i = i + 1) {
            tillSlip.total = tillSlip.total + tillSlip.lineItems[i].cost;
		}
    }
};

// Create tillSlip Object

var tillSlip = new TillSlip([starterPackLineItem, contractLineItem, upgradeLineItem, smartPhoneLineItem, tabletLineItem, polonyLineItem, cheeseLineItem, viennaLineItem, russianLineItem, burgerLineItem]);

// Event Handlers

function addItemEventHandler(quantity, lineItem) {
	lineItem.checkQuantities(quantity);
	if (tillSlip.flag === true) {
		for (let i = 0; i < lineItem.menuItem.ingredientList.length; i = i + 1) {
		lineItem.menuItem.ingredientList[i].usePortions(quantity);
		}
		lineItem.addQuantity(quantity);
		lineItem.calcCost();
    	tillSlip.calcTotal();
		updateDisplay(lineItem);   
	}
	else {;}
	tillSlip.flag = false;
}

function updateDisplay(lineItem) {
    document.getElementById(lineItem.quantityId).innerText = lineItem.quantity;
    document.getElementById(lineItem.unitPriceId).innerText = lineItem.unitPrice;
    document.getElementById(lineItem.costId).innerText = lineItem.cost;
    document.getElementById("total").innerText = tillSlip.total;
}

function resetTillSlip() {
    for (let x = 0; x < tillSlip.lineItems.length; x = x + 1) {
        tillSlip.lineItems[x].quantity = 0;
        tillSlip.lineItems[x].cost = 0;
        tillSlip.total = 0;
        updateDisplay(tillSlip.lineItems[x]);  
    }
}

function updateSales() {
	for (let i = 0; i < tillSlip.lineItems.length; i = i + 1) {
		tillSlip.lineItems[i].menuItem.quantitySold = tillSlip.lineItems[i].quantity;	
	}
}

function placeOrderEventHandler() {
	updateSales();
    resetTillSlip();
}

