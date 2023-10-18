var people = [
    {
      "firstName": "Bob",
      "lastName": "Joe",
      "age": 90
    },
    {
      "firstName": "Alice",
      "lastName": "Smith",
      "age": 35
    },
    {
      "firstName": "John",
      "lastName": "Doe",
      "age": 42
    },
    {
      "firstName": "Emily",
      "lastName": "Johnson",
      "age": 28
    },
    {
      "firstName": "Michael",
      "lastName": "Brown",
      "age": 55
    },
    {
      "firstName": "Sarah",
      "lastName": "Davis",
      "age": 50
    },
    {
      "firstName": "David",
      "lastName": "Miller",
      "age": 63
    },
    {
      "firstName": "Emma",
      "lastName": "Wilson",
      "age": 19
    },
    {
      "firstName": "James",
      "lastName": "Taylor",
      "age": 37
    },
    {
      "firstName": "Olivia",
      "lastName": "Anderson",
      "age": 25
    }
  ]

function displayPerson(index){
    var currentPerson = people[index];

    var cardHTML = `
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">${currentPerson.firstName} ${currentPerson.lastName}</h5>
            <p class="card-text">
                is ${currentPerson.age} years old
            </p>
        </div>
    </div>
    `
    document.getElementById("top").innerHTML = cardHTML;

    displayFriends(index)
}

function displayFriends(index){

    var friendHTML = '';
    var friendCount = 0;

    for (let i = 0; i < people.length; i++) {
        if (i === index) continue;

        if (friendCount > 4) break;

        const currentPerson = people[i];

        friendHTML += `
        <div class="col">
            <div class="card">
                <div class="card-body my-class">
                    <h5 class="card-title">${currentPerson.firstName} ${currentPerson.lastName}</h5>
                    <p class="card-text">
                        is ${currentPerson.age} years old
                    </p>
                </div>
            </div>
        </div>
        `
        friendCount ++
    }
    document.getElementById("bottom").innerHTML = friendHTML;
}


