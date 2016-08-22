var title = document.title = 'DOM and Events';
var body = document.body;
var column = 1, row = 1;

/* buildTable function will construct and style table and table rows */
function buildTable() {
   var table = document.createElement('table');
    table.style.width = '50%';
    table.setAttribute('border', '1px');
    body.appendChild(table);
   var tableBody = document.createElement('tbody');
    table.appendChild(tableBody);

  /* nested loops will construct 4 rows, the first consisting of header cells */
   for (var i = 0; i < 4; i++) {
      var tableRow = document.createElement('tr');
        tableBody.appendChild(tableRow);
      for (var j = 0; j < 4; j++) {
         if (i < 4 && j < 4) {
           /* to build the header row */
           if (i === 0) {
              var tableHeader = document.createElement('th');
                tableHeader.appendChild(document.createTextNode('Header ' + (j + 1)));
                tableRow.appendChild(tableHeader);
           } else {
             /* to build all other rows */
              var tableData = document.createElement('td');
              var dataLabel = (j + 1) + ', ' + i;
                tableData.appendChild(document.createTextNode(dataLabel));
                tableData.setAttribute('id', dataLabel);
              if (j === 0 && i === 1) {
                 tableData.style.border = '4px solid black';
              }
              tableRow.appendChild(tableData);
           }
         }
      }
   }
}

/* buildButtons function will construct and style buttons. the event listener
 * for buttons will determine if cell is marked or moved. */
function buildButtons() {
   var buttonLabel = ['Up', 'Down', 'Left', 'Right', 'Mark Cell'];

  /* loop will construct a button for each label required */
   for (var i = 0; i < buttonLabel.length; i++) {
      var button = document.createElement('button');
        button.setAttribute('id', buttonLabel[i]);
        button.appendChild(document.createTextNode(buttonLabel[i]));
        button.addEventListener('click', function(event) {
          if (event.target.id === 'Mark Cell') {
            var markCell = document.getElementById(row + ', ' + column);
              markCell.style.backgroundColor = 'yellow';
          } else {
            move(event.target.id);
          }
      });
      body.appendChild(button);
   }
}

/* move function changes position of the selected cell, it is called from
 * the button eventListener and accepts the location id of the button as
  * an argument. */
function move(location) {
  /* change the style of current cell to default style */
   var prevCell = document.getElementById(row + ', ' + column);
    prevCell.style.border = '1px solid black';

  /* update location according to movement */
   switch (location) {
     case 'Up':
        if (column !== 1) {
           column--;
        }
        break;
     case 'Down':
        if (column !== 3) {
           column++;
        }
        break;
     case 'Left':
        if (row !== 1) {
           row--;
        }
        break;
     case 'Right':
        if (row !== 4) {
           row++;
        }
        break;
      default:
        break;
   }

  /* adjust style of new current cell to show that it is selected */
   var newCell = document.getElementById(row + ', ' + column);
    newCell.style.border = '4px solid black';
}

buildTable();
buildButtons();
