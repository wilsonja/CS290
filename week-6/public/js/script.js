var wkDoc = document.getElementById('wkEntry');

/* main function to add new data to database and build table */
document.addEventListener('DOMContentLoaded', function() {
  wkDoc.addEventListener('submit', function(event) {
    var req = new XMLHttpRequest();

    req.open('GET', '/newEntry?' + 'name=' + wkDoc.elements.name.value + '&reps=' + wkDoc.elements.reps.value +
                 '&weight=' + wkDoc.elements.weight.value + '&date=' + wkDoc.elements.date.value +
                 '&lbs=' + wkDoc.elements.lbs.value, true);
    req.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    req.addEventListener('load', function() {
      if(req.status >= 200 && req.status < 400) {
        var response = JSON.parse(req.responseText);
        var table = document.getElementById('wkBody');
        var newTable = document.createElement('tbody');   // create a new table to add new entries to
        newTable.id = 'wkBody';
        // loop to insert all database entries into updated table
        for(var entry in response) {
          addRow(response[entry], newTable.insertRow(entry));
        }
        table.parentNode.replaceChild(newTable, table);    // replace old table with updated table
      } else {
        console.log('Error in network request: ' + request.statusText);
      }
    });
    req.send('/newEntry?' + 'name=' + wkDoc.elements.name.value + '&reps=' + wkDoc.elements.reps.value +
                 '&weight=' + wkDoc.elements.weight.value + '&date=' + wkDoc.elements.date.value +
                 '&lbs=' + wkDoc.elements.lbs.value);
    event.preventDefault();
  });
});

/* addRow function populates each new row with data from the database. */
function addRow(entry, newRow) {
  var id = document.createElement('td');
  id.textContent = entry.id;
  id.style.display = 'none';
  newRow.appendChild(id);

  var name = document.createElement('td');
  name.textContent = entry.name;
  newRow.appendChild(name);

  var reps = document.createElement('td');
  reps.textContent = entry.reps;
  newRow.appendChild(reps);

  var weight = document.createElement('td');
  weight.textContent = entry.weight;
  newRow.appendChild(weight);

  var lbs = document.createElement('td');
  if(entry.lbs == 1) {
    lbs.textContent = 'Lbs';
  } else {
    lbs.textContent = 'Kgs';
  }
  newRow.appendChild(lbs);

  var date = document.createElement('td');
  date.textContent = entry.date;
  newRow.appendChild(date);

  var edit = document.createElement('td');
  edit.innerHTML = '<a href="wkUpdate/?id='+entry.id+'"><input type="button" value="Edit"></a>';
  newRow.appendChild(edit);

  var deleteButton = document.createElement('td');
  deleteButton.innerHTML = '<input type="button" value="Delete" onclick="deleteRow(\'wkBody\', this, '+entry.id+')">';
  newRow.appendChild(deleteButton);
}

/* deleteRow function removes a single target row. portions of code are similar to those provided
 * in the CS290 project description. utilizes AJAX to avoid refreshing page. */
function deleteRow(currentTable, currentRow, rowId) {
  var req = new XMLHttpRequest();

  req.open('GET', '/delete' + '?id=' + rowId, true);
  req.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
  req.addEventListener('load', function() {
    if(req.status >= 200 && req.status < 400) {
      console.log('Deletion successful');
    } else {
      console.log('Deletion Error');
    }
  });
  // delete the row here and update remaining rows
  var table = document.getElementById(currentTable);
  var rowCount = table.rows.length;
  for(var i = 0; i < rowCount; i++) {
    var row = table.rows[i];
    if(row == currentRow.parentNode.parentNode) {
      table.deleteRow(i);
      rowCount--;
      i--;
    }
  }
  req.send('/delete' + 'id=' + rowId);
}
