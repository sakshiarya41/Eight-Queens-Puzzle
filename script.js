// Take input from user
var size = parseInt(
    window.prompt(
        "Welcome, to N-Queen Puzzle Game. Please, Enter size of Board: 4 or 8"
    )
);

//Check for valid size

while (!(size == 4 || size== 8)) {
    alert("Not Valid Board size");
    var size = parseInt(window.prompt("Enter size of board: 4 or 8"));
}

var id = 0;
var count = 0;

// Create Chessboard 
var chessboard = document.getElementById('chessboard');

for (var row = 0; row < size; row++) {
    for (var col = 0; col < size; col++) {
        var chessSquare = document.createElement('div');
        chessSquare.className = 'chess-square';
        var id = row * size + col;
        chessSquare.id=id;
        if ((row + col) % 2 == 0) {
            chessSquare.style.backgroundColor = 'transparent';
        }
        chessboard.appendChild(chessSquare);
        if(size==4){
            chessboard.style.width="400px";
            chessboard.style.height="400px";
            chessboard.style.marginTop="15%";
            chessSquare.style.width="100px";
            chessSquare.style.height="100px";

        }
    }
}
chessboard.style.border="4px solid black";

// On clicking cell

function placeq(event) {
    if(count<size)
    {
        var id = event.target.id;
        var q = eval(id);
        var r = Math.floor(q / size);
        var c = q % size;
        var queen=document.getElementById(q);

        //Check if clicked cell already contains queen

        if (queen.classList.contains("queen")){
            queen.style.backgroundImage= "none";
            queen.classList.remove("queen");
            queen.classList.remove("extra");
            queen.classList.remove("occupied");
            count--;

            // For removing classlist

            //For checking classlist Horizontally

            for (var h = r * size; h < r * size + size; h++) {
                var dot=document.getElementById(h);
                if(!(dot.classList.contains("extra"))){
                    dot.classList.remove("occupied");
                }
                else{
                    dot.classList.remove("extra");
                }
                
            }

            // For checking classlist Vertically

            for (var v = c; v < size * size; v = v + size) {
                var dot=document.getElementById(v);
                if(!(dot.classList.contains("extra"))){
                    dot.classList.remove("occupied");
                }
                else{
                    dot.classList.remove("extra");
                }
            }

        // For checking classlist Diagonally on one way   
                                        
            if (c > r) {
                var x1 = c - r;
                var x2 = q + (size + 1) * (size - c);
            } else {
                var x1 = (r - c) * size;
                var x2 = q + (size + 1) * (size - r);
            }
            for (var x = x1; x < x2; x = x + size + 1) {
                var dot=document.getElementById(x);
                if(!(dot.classList.contains("extra"))){  
                    dot.classList.remove("occupied");
                }
                else{
                    dot.classList.remove("extra");
                }
                    
            }

            // For checking classlist Diagonally on second way

            if (r + c > size - 1) {
                var y1 = q - (size - 1 - c) * (size - 1);
                var y2 = q + (size - 1) * (size - r);
            } else {
                var y1 = r + c;
                var y2 = q + size * c;
            }
            for (var y = y1; y < y2; y = y + (size - 1)) {
                var dot=document.getElementById(y);
                if(!(dot.classList.contains("extra"))){
                    dot.classList.remove("occupied");
                }
                else{
                    dot.classList.remove("extra");
                }
            }
        }  // if not contains queen then place queen
        
        else 
        {
            // check whether queen position is safe or not
            
            if (safe(q))
            { 

                //check Horizontal relative cells for  Queen
                    
                for (var h = r * size; h < r * size + size; h++) {
                    var dot=document.getElementById(h);
                    if(dot.classList.contains("occupied"))
                    {
                        dot.classList.add("extra");
                    }
                    else{
                        dot.classList.add("occupied");
                    }
                        
                }

                //check Vertical relative cells for  Queen

                for (var v = c; v < size * size; v = v + size) {
                    var dot=document.getElementById(v);
                    if(dot.classList.contains("occupied"))
                    {
                        dot.classList.add("extra");
                    }
                    else{
                        dot.classList.add("occupied");
                    }
                        
                }

                //check Diagonal relative cells for  Queen on one way   
                                                
                if (c > r) {
                    var x1 = c - r;
                    var x2 = q + (size + 1) * (size - c);
                } else {
                    var x1 = (r - c) * size;
                    var x2 = q + (size + 1) * (size - r);
                }
                for (var x = x1; x < x2; x = x + size + 1) {
                    var dot=document.getElementById(x);
                    if(dot.classList.contains("occupied"))
                    {
                        dot.classList.add("extra");
                    }
                    else{
                        dot.classList.add("occupied");
                    }
                }

                // For checking Diagonally for any Queen on second way

                if (r + c > size - 1) {
                    var y1 = q - (size - 1 - c) * (size - 1);
                    var y2 = q + (size - 1) * (size - r);
                } else {
                    var y1 = r + c;
                    var y2 = q + size * c;
                }
                for (var y = y1; y < y2; y = y + (size - 1)) {
                    var dot=document.getElementById(y);
                    if(dot.classList.contains("occupied")){
                        dot.classList.add("extra");
                    }
                    else{
                        dot.classList.add("occupied");
                    }
                }

                //insert queen
                queen.style.backgroundImage="url('Images/queen.png')";
                queen.style.backgroundRepeat="no-repeat";
                queen.style.backgroundPosition="center";
                queen.style.backgroundSize="40px 40px";
                queen.classList.add("queen");
                count++; 
                if (count == size) {
                    alert("Hurray..!!🎉🎉, you solved it!");
                }

            }                   
        }
                    
    }
    else{
        alert("Click on Reset Game to play again.!!")
    }
}

// To check if the position is already occupied

function safe(a) {
    var occuppied=document.getElementById(a);
    var clsList=occuppied.classList;
    if ( clsList.contains("occupied")) {
        alert('Position not possible');
        return false;   
    } else {
        return true;
       
    }
}

// Function to clear the board
function clearBoard(){
    for(var i=0; i<size*size; i++){
        var game=document.getElementById(i);
        if (game.classList.contains("occupied","queen")){
            game.style.backgroundImage= "none";
            game.classList.remove("queen");
            game.classList.remove("occupied");
            game.classList.remove("extra");
        }
    }
    count=0;
}


