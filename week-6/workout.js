var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'student',
  password: 'default',
  database: 'student',
  dateStrings: 'true'
});
var app = express();

app.use(express.static('public'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

/* display opening page */
app.get('/', function(req,res,next) {
  var context = {};
  pool.query("SELECT * FROM `workouts`", function(err,rows,fields) {
    if(err) {
      next(err);
      return;
    }
    context.results = rows;
    res.render('home', context);
  });
});

/* insert workout data */
app.get('/newEntry', function(req,res,next) {
  var context = {}
  pool.query("INSERT INTO `workouts`(`name`,`reps`,`weight`,`date`,`lbs`) VALUES(?,?,?,?,?)",
  [req.query.name,req.query.reps,req.query.weight,req.query.date,req.query.lbs], function(err,results){
    if(err) {
      next(err);
      return;
    }
    // send all data from database to front end
    pool.query("SELECT * FROM `workouts`", function(err,rows,fields) {
      if(err) {
        next(err);
        return;
      }
      res.send(JSON.stringify(rows));
    });
  });
});

/* update form data */
app.get('/wkUpdate', function(req,res,next) {
  var context = {};
  pool.query("SELECT * FROM `workouts` WHERE id=?", [req.query.id], function(err,rows,fields) {
    if(err) {
      next(err);
      return;
    }
    // set up data to pre-populate fields
    var tableData = [];
    for(var i in rows) {
      tableData.push({'name':rows[i].name, 'reps':rows[i].reps, 'weight':rows[i].weight, 'date':rows[i].date, 'lbs':rows[i].lbs, 'id':rows[i].id})
    }
    context.results = tableData[0];
    res.render('update', context);
  });
});

/* update data */
app.get('/update', function(req,res,next) {
  var context = {};
  pool.query("UPDATE `workouts` SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=?",
  [req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.lbs, req.query.id], function(err, result) {
    if(err) {
      next(err);
      return;
    }
    pool.query("SELECT * FROM `workouts`", function(err,rows,field) {
      if(err) {
        next(err);
        return;
      }
      context.results = rows;
      res.render('home', context);
    });
  });
});

/* delete data */
app.get('/delete', function(req,res,next) {
  var context = {};
  pool.query("DELETE FROM `workouts` WHERE id=?", [req.query.id], function(err,result) {
    if(err) {
      next(err);
      return;
    }
    pool.query("SELECT * FROM `workouts`", function(err,rows,fields) {
      if(err) {
        next(err);
        return;
      }
      context.results = JSON.stringify(rows);
      res.render('home', context);
    });
  });
});

/* reset table, as provided in CS290 Final Project description */
app.get('/reset-table', function(req,res,next) {
  var context = {};
  pool.query("DROP TABLE IF EXISTS workouts", function(err) {
    var createString = "CREATE TABLE workouts("+
    "id INT PRIMARY KEY AUTO_INCREMENT,"+
    "name VARCHAR(255) NOT NULL,"+
    "reps INT,"+
    "weight INT,"+
    "date DATE,"+
    "lbs BOOLEAN)";
    pool.query(createString, function(err) {
      context.results = "Table reset";
      res.render('home', context);
    })
  });
});

/* ERROR calls */
app.use(function(req,res) {
  res.status(404);
  res.render('404');
});

app.use(function(err,req,res,next) {
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

/* set port */
app.listen(app.get('port'), function() {
  console.log('Workout Tracker app started on port ' + app.get('port') + '; press Ctrl-C to terminate');
});
