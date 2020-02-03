// On document ready, hides user info card
$(() => {
  $("#userInfo").hide();
});

let tableCount = 1;
// Class that describes reservations.
// Expects all of the information to be strings
class Reservation {
  constructor(name, size, phone, email) {
    this.name = name;
    this.size = size;
    this.phone = phone;
    this.email = email;
    this.table = tableCount;
  }
}

iterateTable = () => {
  tableCount += 1;
};

// Returns whitespace trimmed value of the selected form element
trimValue = () => {
  let trimmedArray = [
    $("#name")
      .val()
      .trim(),
    $("#size")
      .val()
      .trim(),
    $("#phone")
      .val()
      .trim(),
    $("#email")
      .val()
      .trim()
  ];

  return trimmedArray;
};

// Clears form elements
clearForm = () => {
  $("#name").val("");
  $("#size").val("");
  $("#phone").val("");
  $("#email").val("");
};

addReservation = obj => {
  let content = `
          <li class="list-group-item mt-4">
            <h2>Table ${obj.table}</h2>
            <hr />
            <h2>Name: ${obj.name}</h2>
            <h2>Email: ${obj.email}</h2>
            <h2>Phone: ${obj.phone}</h2>
            <h2>Party Size: ${obj.size}</h2>
          </li>
      `;
  if (obj.table < 5) {
    $("#current").append(content);
  } else {
    $("#waiting").append(content);
  }
};

$("#book-btn").on("click", function(e) {
  e.preventDefault();
  $("#userInfo").toggle();
});

$("#res-btn").on("click", function(e) {
  e.preventDefault();

  // Creates a new reservation object with trimmed values of form input
  const resy = new Reservation(
    trimValue()[0],
    trimValue()[1],
    trimValue()[2],
    trimValue()[3]
  );
  iterateTable();
  clearForm();
  $.post("/api/reserve", resy).then(function(data) {
    console.log(data);
    $("#current").html("");
    data.forEach(idx => {
      addReservation(idx);
    });
  });
});
