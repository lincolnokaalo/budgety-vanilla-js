// budget controller module
// add the new item to our data structure
// calculate the budget
var budgetController = (function () {
  var expense = function(id, description, value){
   this.id = id;
   this.description = description;
   this.value = value;
  };

    var income = function (id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    };

    var data = {
     allItems: {
        exp: [],
        inc: []
       },
     totals:{
        exp: 0,
        inc: 0
       }
    };

    return {
     addItem: function(type, des, val){
      var newItem, ID;

      // ID = last ID + 1
      // create new ID > 0
           if(data.allItems[type].length > 0){
              ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
          } else {
           ID = 0;
          }

         // create new item based on inc or exp type
         if (type === "exp") {
             newItem = new expense(ID, des, val);
           } else if (type === "inc"){
           newItem = new income(ID, des, val);
         }

         // push it into the data structure
         data.allItems[type].push(newItem);

         // return the new element
         return newItem;
      }
    }

})();

// UI module
// Get input values
// add the new item to the UI
// update the UI
var UIcontroller = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: '.income__list',
    expensesContainer: '.expenses__list'
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value, // inc or exp
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },
    addListItem: function(obj, type){
     var html, newHtml, element;

      // create HTML string with placeholder text
      if (type === 'inc'){
       element = DOMstrings.incomeContainer;

       html = `<div class="item clearfix" id="income-%id%">
                            <div class="item__description">%description%</div>
                            <div class="right clearfix">
                                <div class="item__value">%value%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;

      } else if (type === 'exp'){
       element = DOMstrings.expensesContainer;

       html = `<div class="item clearfix" id="expense-%id%">
                            <div class="item__description">%description%</div>
                            <div class="right clearfix">
                                <div class="item__value">%value%</div>
                                <div class="item__percentage">21%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;

      }

      // replace placeholder with actual data
      newHtml = html.replace(`%id%`, obj.id);
      newHtml = newHtml.replace(`%description%`, obj.description);
      newHtml = newHtml.replace(`%value%`, obj.value);

      // insert the html into the dom
      document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
    },

    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();

// controller module
// add event handler
var controller = (function (budgetCtrl, UICtrl) {
  var setupEventListeners = function () {
    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", function (event) {
      if (event.keycode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  var ctrlAddItem = function () {
   var input, newItem;
    // get field input data
     input = UICtrl.getInput();

    // add item to budget controller
     newItem = budgetCtrl.addItem(input.type, input.description, input.value);

    // add item ui
    UICtrl.addListItem(newItem, input.type);
    // calculcate the budget
    // display the budget to the ui
  };

  return {
    init: function () {
      console.log("application started");
      setupEventListeners();
    },
  };
})(budgetController, UIcontroller);

controller.init();
