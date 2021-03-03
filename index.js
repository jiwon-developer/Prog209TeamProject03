// start by creating data so we don't have to type it in each time
let bookArray = [];

// define a constructor to create movie objects
let BookObject = function (pSubject, pPublisher, pAuthor, pISBN, pStockNum, pClassfiacation, pRating, pImgUrl) {
    this.ID = pISBN.toString();
    this.Publisher = pPublisher;
    this.Subject = pSubject;
    this.Author = pAuthor;
    this.ISBN = pISBN;
    this.StockNum = pStockNum;
    this.Classfication = pClassfiacation;  // action  comedy  drama  horrow scifi  musical  western
    this.Rating = pRating;
    this.imgUrl = pImgUrl;
}


bookArray.push(new BookObject("Build An HTML5 Game1", "San Francisco : No Starch Press", "Bunyan, Karl", "9781593275754", 10, "Science&Math", 4));
bookArray.push(new BookObject("The Worldly Philosophers", "New York : Simon & Schuster, [1999]", "Heilbroner, Robert L.", "9780684862149", 01, "History", 3));
bookArray.push(new BookObject("Philip K. Dick's Electric Dreams", "Boston : Houghton Mifflin Harcourt, [2017]", "Dick, Philip K.", "9781328995063", 8, "Social Science", 4));

bookArray.push(new BookObject("book4", "San Francisco : No Starch Press", "Bunyan, Karl", "9781593275755", 10, "Science&Math", 4));

bookArray.push(new BookObject("Book5", "San Francisco : No Starch Press", "Bunyan, Karl", "9781593275756", 10, "Science&Math", 4));
bookArray.push(new BookObject("Book6", "San Francisco : No Starch Press", "Bunyan, Karl", "9781593275757", 10, "Science&Math", 4));


let selectedGenre = "not selected";

document.addEventListener("DOMContentLoaded", function () {





    // page before show code *************************************************************************
    // page before show code *************************************************************************
    $(document).on("pagebeforeshow", "#ListAll", function (event) {   // have to use jQuery 
        createList();
    });




    $(document).on("pagebeforeshow", "#MyList", function (event) {   // have to use jQuery 
        createMyList();
    });


    // need one for our details page to fill in the info based on the passed in ID
    $(document).on("pagebeforeshow", "#details", function (event) {   // have to use jQuery 

        let localID = document.getElementById("IDparmHere").innerHTML;
        console.log("LOCALID:" + localID)
        const found = bookArray.find(element => {
            console.log(element.ID + "," + element.Subject)
            if (element.ID == localID) {
                document.getElementById("oneTitle").innerHTML = "The title is: " + element.Subject;
                document.getElementById("onePublisher").innerHTML = "Publisher: " + element.Publisher;
                document.getElementById("oneClassify").innerHTML = "Classification:" + element.Classfication
                document.getElementById("oneAuthor").innerHTML = "Author : " + element.Author;
                if (element.StockNum > 0) {
                    document.getElementById("oneInstock").innerHTML = "Instock#: yes";
                } else {
                    document.getElementById("oneInstock").innerHTML = "Instock: no ";
                }

                document.getElementById("oneISBN").innerHTML = "ISBN#: " + element.ISBN;

            }
            return;
        });




    });

    // end of page before show code *************************************************************************

});
// end of wait until document has loaded event  *************************************************************************

function createList() {
    //call the node server and it will return an array of movies
    // clear prior data
    var divBookList = document.getElementById("divBookList");
    while (divBookList.firstChild) {    // remove any old data so don't get duplicates
        divBookList.removeChild(divBookList.firstChild);
    };

    var ul = document.createElement('ul');

    bookArray.forEach(function (element,) {   // use handy array forEach method
        var li = document.createElement('li');
        // adding a class name to each one as a way of creating a collection
        li.classList.add('oneBook');
        // use the html5 "data-parm" to encode the ID of this particular data object
        // that we are building an li from
        li.setAttribute("data-parm", element.ID);

        li.innerHTML = element.Subject + "<p style='font-size:12px'> ISBN#:" + element.ISBN + "<hr>";
        ul.appendChild(li);
    });
    divBookList.appendChild(ul)
    // now we have the HTML done to display out list, 
    // next we make them active buttons
    // set up an event for each new li item, 
    var liArray = document.getElementsByClassName("oneBook");
    Array.from(liArray).forEach(function (element) {
        element.addEventListener('click', function () {
            // get that data-parm we added for THIS particular li as we loop thru them
            var parm = this.getAttribute("data-parm");  // passing in the record.Id
            // get our hidden <p> and write THIS ID value there
            document.getElementById("IDparmHere").innerHTML = parm;
            console.log("parm:" + parm)
            // now jump to our page that will use that one item
            document.location.href = "index.html#details";
        });
    });

};
function createMyList() {
    //call the node server and it will return an array of movies
    // clear prior data
    var divBookList = document.getElementById("divMyBookList");
    while (divBookList.firstChild) {    // remove any old data so don't get duplicates
        divBookList.removeChild(divBookList.firstChild);
    };

    var ul = document.createElement('ul');

    bookArray.forEach(function (element,) {   // use handy array forEach method
        var li = document.createElement('li');
        // adding a class name to each one as a way of creating a collection
        li.classList.add('oneBook');
        // use the html5 "data-parm" to encode the ID of this particular data object
        // that we are building an li from
        li.setAttribute("data-parm", element.ID);


        li.innerHTML = element.Subject + "<p style='font-size:12px'> ISBN#:" + element.ISBN + "<hr>";
        ul.appendChild(li);

    });
    divBookList.appendChild(ul)

    // now we have the HTML done to display out list, 
    // next we make them active buttons
    // set up an event for each new li item, 
    var liArray = document.getElementsByClassName("oneBook");
    Array.from(liArray).forEach(function (element) {
        element.addEventListener('click', function () {
            // get that data-parm we added for THIS particular li as we loop thru them
            var parm = this.getAttribute("data-parm");  // passing in the record.Id
            // get our hidden <p> and write THIS ID value there
            document.getElementById("IDparmHere").innerHTML = parm;
            // now jump to our page that will use that one item
            document.location.href = "index.html#details";
        });
    });

};

