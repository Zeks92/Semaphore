(() => {
    let randomNum = 0;
    let array = [];
    let binValue;
    const arrayLength = 8;

    // sets a period to 2 second for new random number
    setInterval(() => {
        makeRequest();
    }, 2000);

    let makeRequest = () => {
        let xmlHttp = new XMLHttpRequest();
        const url =
            "https://cors-anywhere.herokuapp.com/https://csrng.net/csrng/csrng.php?min=0&max=255";

        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                const response = JSON.parse(xmlHttp.responseText);
                console.log("response arrived", response[0]);
                console.log("response arrived", response);
                randomNum = response[0].random;

                binValue = toBin(randomNum);


                if (Array.from(binValue).length === arrayLength) {
                    Array.from(binValue).forEach((item, index) => {
                        assignClassToSelector(item, index);
                        return array.push(item);
                    });
                    array = [];
                } else {


                    let binaryArray = Array.from(binValue);
                    binaryArray = array.concat(binaryArray);

                    const numericDiffrence = arrayLength - binaryArray.length;

                    for (let i = 0; i < numericDiffrence; i++) {
                        binaryArray.unshift("0");
                    }

                    binaryArray.forEach((item, index) => {
                        assignClassToSelector(item, index);
                        return array.push(item);
                    });

                    array = [];
                }
            }
        };
        xmlHttp.addEventListener("loadend", loadEnd);
        xmlHttp.open("GET", url, true);
        xmlHttp.send();
    };

    // triggers when request is finished
    let loadEnd = () => {
        console.log("loadEnd");
        assignWaitPropertyToElement();
    };

    // converts random number to binary
    let toBin = (number) => {
        let result = [];
        let i;
        for (i = number; i > 0; i = parseInt(i / 2)) {
            result.push(i % 2);
        }
        return result.reverse().join("");
    };

    // assign one of possible states to each selector
    let assignClassToSelector = (item, index) => {
        const circleElements = document.querySelectorAll(".circle");
        if (item === "0") {
            if (circleElements[index]) {
                circleElements[index].classList.remove("green");
                circleElements[index].classList.remove("yellow");
                circleElements[index].classList.add("red");
            }
        } else if (item === "1") {
            if (circleElements[index]) {
                circleElements[index].classList.remove("red");
                circleElements[index].classList.remove("yellow");
                circleElements[index].classList.add("green");
            }
        }
    };
    // returns state of selector to waiting for random number
    let assignWaitPropertyToElement = () => {
        setTimeout(() => {
            const circleElements = document.querySelectorAll(".circle");
            Array.from(circleElements).forEach((circleElement) => {
                circleElement.classList.remove("red");
                circleElement.classList.remove("green");
                circleElement.classList.add("yellow");
            });
        }, 600);
    };
})();