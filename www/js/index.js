// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVpPlwD91MsReXwJDzJJkINGLSh7pPlQc",
  authDomain: "login-i-notes-3b380.firebaseapp.com",
  databaseURL: "https://login-i-notes-3b380-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "login-i-notes-3b380",
  storageBucket: "login-i-notes-3b380.appspot.com",
  messagingSenderId: "652630258215",
  appId: "1:652630258215:web:1e337bb2a044a24813d402"
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  
  function register() {
    // Get all our input fields
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var full_name = document.getElementById('full_name').value;
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!');
      return;
    }
  
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
      .then(function() {
        // Declare user variable
        var user = auth.currentUser;
  
        // Add this user to Firebase Database
        var database_ref = database.ref();
  
        // Create User data
        var user_data = {
          email: email,
          full_name: full_name,
          password: password,
        };
  
        // Push to Firebase Database
        database_ref.child('users/' + user.uid).set(user_data, function(error) {
          if (error) {
            // There was an error adding the data to Firebase
            alert('Failed to add user data to Firebase.');
          } else {
            // Data added successfully, redirect to login.html
            window.location.href = 'index.html';
            alert('User are created');
          }
        });
      })
      .catch(function(error) {
        // Firebase will use this to alert its errors
        var error_code = error.code;
        var error_message = error.message;
  
        alert(error_message);
      });
  }
  
  // Set up our login function
  function login () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
  
      // DOne
      window.location.href = 'note.html';
      alert('Login Successful !!')
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }