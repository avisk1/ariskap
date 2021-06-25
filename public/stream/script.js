function update(id, value) {
    const input = document.getElementById(id);
    console.log(value);
    input.value = value;
}

request("test.txt", update, "input");
request("numbers.txt", update, "num");

function increment() {
    const num = document.getElementById("num");
    num.value = parseInt(num.value) + 1;
    writeToServerFile(num.value, "numbers.txt")
}

//pleaseWork.php needs to be able to accept an object
function writeToServerFile(output, file) {
    var data = new FormData();
    data.append("data" , output);
    data.append("file", file);
    const xhttp = new XMLHttpRequest();
    xhttp.open( 'POST', "../pleaseWork.php", true );
    xhttp.send(data);
}

function save() {
    const input = document.getElementById("input");
    writeToServerFile(input.value, "test.txt");
}

function request(file, func, id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            func(id, this.responseText);
        } else {
            console.log("@$?#%!");
        }
    };
    xhttp.open("GET", "../" + file, true);
    xhttp.send();
}



// function request(file, func) {
//     var xhttp = new XMLHttpRequest();
//     xhttp.onreadystatechange = function() {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log("HEY IT ACTUALLY WORKED (maybe)");
//             console.log(this.responseText);
//             func(this.responseText);
//         } else {
//             console.log("@$?#%!");
//         }
//     };
//     xhttp.open("GET", "../" + file, true);
//     xhttp.send();
// }