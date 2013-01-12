function restorify(){
    var i;
    var j;
    var k = 0;
    for (i = 1; i < 16; i++)
        for (j = 1; j < 16; j++) {
            if (arrayrestore[k] != undefined)
                document.getElementById("c"+i+"_"+j).innerHTML = arrayrestore[k++];
            else 
                document.getElementById("c"+i+"_"+j).innerHTML = "";
            console.log(arrayrestore[k-1]);
        }
    k = 0;
    for (i = 1; i < 8; i++) {
        document.getElementById("lp1"+i).innerHTML = lp1restore[i-1];
        document.getElementById("lp2"+i).innerHTML = lp2restore[i-1];
        console.log("ok");
    }
}

function winningconditions(){
    if (gamewon == 1)
        alert("Jocul s-a incheiat deja!");
    else{
        var pname1 = document.getElementById("player_unu").innerHTML;
        console.log(pname1);
        var pname2 = document.getElementById("player_doi").innerHTML;
        var puc1 = document.getElementById("punctaj_player1").innerHTML;
        var puc2 = document.getElementById("punctaj_player2").innerHTML;
        var i;
        var ok = 1;
        for (i = 1; i < 8; i++)
            if (document.getElementById("lp1"+i).innerHTML != "") {
                ok = 0;
                break;
            }
        if (ok == 1){
            gamewon = 1;
            puc1 = puc1 + 50;
            if (puc1 > puc2)
                alert(pname1 + " a castigat!");
            else if(puc2>puc1)
                alert(pname2 + " a castigat!");
            else
                alert("Egalitate!");
        }
        else{
            var ok2 = 1;
            for (i = 1; i < 8; i++)
                if (document.getElementById("lp2"+i).innerHTML != "") {
                    ok2 = 0;
                    break;
                }
            if (ok2 == 1){
                gamewon = 1;
                puc2 = puc2 + 50;
                if (puc2 > puc1)
                    alert(pname2 + " a castigat!");
                else if (puc1 > puc2)
                    alert(pname1 + " a castigat!");
                else
                    alert("Egalitate!");
            }
        }
    }
}

function restore() {
    arrayrestore = [];
    lp1restore = [];
    lp2restore = [];
    for (var i = 1; i < 16; i++)
        for (var j = 1; j < 16; j++)
            arrayrestore = arrayrestore.concat(document.getElementById("c"+i+"_"+j).innerHTML);
    console.log(arrayrestore);
    for (var i = 1; i < 8; i++) {
        lp1restore = lp1restore.concat(document.getElementById("lp1"+i).innerHTML);
        lp2restore = lp2restore.concat(document.getElementById("lp2"+i).innerHTML);
    }
}

function verify(){
    var alfabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "L", "M", "N", "O", "P", "R", "S", "T", "U", "V", "X", "Z"];
    var punctaj = [1, 9, 1, 2, 1, 8, 9, 10, 1, 10, 1, 4, 1, 1, 2, 1, 1, 1, 1, 8, 10, 10]
    var i;
    var j;
    var ok = 1;
    var punctaj_player1 = parseInt(document.getElementById("punctaj_player1").innerHTML);
    var punctaj_player2 = parseInt(document.getElementById("punctaj_player2").innerHTML);
                
    var punctajpartial = 0;
    var multiplicator = 1;
    var cuvinteadaugate = [];

    //verificare pe linii
    for (i=1; i<16; i++) {
        punctajpartial = 0;
        multiplicator = 1;
        var cuvantnou = "";
        for (j=1; j<16; j++) {
            var x = document.getElementById("c"+i+"_"+j).innerHTML;
            if (x != "" && x!= undefined) {
                cuvantnou = cuvantnou + x;
                var culoare = document.getElementById("c"+i+"_"+j).getAttribute("style");
                if (culoare == "background-image:url(images/lighter.png)"
                    || culoare == "background-image:url(images/darker.png)")
                    punctajpartial = punctajpartial + punctaj[alfabet.indexOf(x)];
                if (culoare == "background-color:#f4cecd") { //roz
                    punctajpartial = punctajpartial + punctaj[alfabet.indexOf(x)];
                    multiplicator = multiplicator * 2;
                }
                if (culoare == "background-color:#66c9e8") { //albastru
                    punctajpartial = punctajpartial + 3*punctaj[alfabet.indexOf(x)];
                }
                if (culoare == "background-color:#ee3940") { //rosu
                    punctajpartial = punctajpartial + punctaj[alfabet.indexOf(x)];
                    multiplicator = multiplicator * 3;
                }
                if (culoare == "background-color:#b8cc69") { //verde
                    punctajpartial = punctajpartial + 2*punctaj[alfabet.indexOf(x)];
                }               
            }
            if ((x == "" || x == undefined) && cuvantnou != "" && cuvantnou.length > 1) {
                if (cuvintedepetabela.indexOf(cuvantnou) == -1) {
                    var response = 1;
                    if (response != 0) {
                        cuvinteadaugate = cuvinteadaugate.concat(cuvantnou);
                        cuvantnou = "";
                        if (playerturn == 1)
                            punctaj_player1 = punctaj_player1 + punctajpartial * multiplicator;
                        else
                            punctaj_player2 = punctaj_player2 + punctajpartial * multiplicator;
                        multiplicator = 1;
                        punctajpartial = 0;
                    } 
                    else {
                        ok = 0;
                        multiplicator = 1;
                        punctajpartial = 0;
                        cuvantnou = "";
                    }                
                }
                else{  
                    multiplicator = 1;
                    punctajpartial = 0;
                    cuvantnou = "";
                }
            }
        }
    }

    punctajpartial = 0;
    multiplicator = 1;

    //verificare pe coloane
    for (i=1; i<16; i++) {
        punctajpartial = 0;
        multiplicator = 1;
        var cuvantnou = "";
        for (j=1; j<16; j++) {
            var x = document.getElementById("c"+j+"_"+i).innerHTML;
            if (x != "" && x!= undefined) {
                cuvantnou = cuvantnou + x;
                var culoare = document.getElementById("c"+j+"_"+i).getAttribute("style");
                if (culoare == "background-image:url(images/lighter.png)" || culoare == "background-image:url(images/darker.png)")
                    punctajpartial = punctajpartial + punctaj[alfabet.indexOf(x)];
                if (culoare == "background-color:#f4cecd") { //roz
                    punctajpartial = punctajpartial + punctaj[alfabet.indexOf(x)];
                    multiplicator = multiplicator * 2;
                }
                if (culoare == "background-color:#66c9e8") {  //albastru
                    punctajpartial = punctajpartial + 3*punctaj[alfabet.indexOf(x)];
                }
                if (culoare == "background-color:#ee3940") { //rosu
                    punctajpartial = punctajpartial + punctaj[alfabet.indexOf(x)];
                    multiplicator = multiplicator * 3;
                }
                if (culoare == "background-color:#b8cc69") { //verde
                    punctajpartial = punctajpartial + 2*punctaj[alfabet.indexOf(x)];
                }               
            }
            if ((x == "" || x == undefined) && cuvantnou != "" && cuvantnou.length > 1) {
                if (cuvintedepetabela.indexOf(cuvantnou) == -1) {
                    var response = 1;
                    if (response != 0) {
                        cuvinteadaugate = cuvinteadaugate.concat(cuvantnou);
                        cuvantnou = "";
                        if (playerturn == 1)
                            punctaj_player1 = punctaj_player1 + punctajpartial * multiplicator;
                        else
                            punctaj_player2 = punctaj_player2 + punctajpartial * multiplicator;
                        multiplicator = 1;
                        punctajpartial = 0;
                    } 
                    else {
                        ok = 0;
                        multiplicator = 1;
                        punctajpartial = 0;
                        cuvantnou = "";
                    }
                }
                else{  
                    multiplicator = 1;
                    punctajpartial = 0;
                    cuvantnou = "";
                }
            }
        }
    }

    if (cuvinteadaugate.length == 0)
        ok = 0;

    if (firstturn == 1 && (document.getElementById("c8_8").innerHTML == undefined
        || document.getElementById("c8_8").innerHTML == "")){
        ok = 0;
        alert("Primul cuvant trebuie sa treaca prin centru!");
    }
    
    if (ok == 0) { //revenim la starea initiala
        var i;
        var j;
        var k = 0;
        for (i = 1; i < 16; i++)
            for (j = 1; j < 16; j++) {
                if (arrayrestore[k] != undefined)
                    document.getElementById("c"+i+"_"+j).innerHTML = arrayrestore[k++];
                else 
                    document.getElementById("c"+i+"_"+j).innerHTML = "";
                console.log(arrayrestore[k-1]);
            }
        k = 0;
        for (i = 1; i < 8; i++) {
            document.getElementById("lp1"+i).innerHTML = lp1restore[i-1];
            document.getElementById("lp2"+i).innerHTML = lp2restore[i-1];
            console.log("ok");
        }
        alert("Introdu valori valide!");
    }
    else {
        for (i = 1; i < 16; i++)
            for (j = 1; j < 16; j++)
                arrayrestore = arrayrestore.concat(document.getElementById("c"+i+"_"+j).innerHTML);
        cuvintedepetabela = cuvintedepetabela.concat(cuvinteadaugate);
        if (playerturn == 1)
            document.getElementById("punctaj_player1").innerHTML = punctaj_player1;
        else
            document.getElementById("punctaj_player2").innerHTML = punctaj_player2;
        playerturn = 3 - playerturn;
        firstturn = 0;
        randomlettersofdoom(3 - playerturn);
        winningconditions();
        restore();
    }
}

function giveup() {
    gamewon = 1;
    var pname1 = document.getElementById("player_unu").innerHTML;
    console.log(pname1);
    var pname2 = document.getElementById("player_doi").innerHTML;
    if (playerturn == 1)
        alert(pname1 + " a renuntat!");
    else
        alert(pname2 + " a renuntat!");
}

function skip() {
    var punctaj_player;
    punctaj_player = parseInt(document.getElementById("punctaj_player" + playerturn).innerHTML);
    punctaj_player = punctaj_player - 10;
    document.getElementById("punctaj_player" + playerturn).innerHTML = punctaj_player;
    playerturn = 3 - playerturn;
}