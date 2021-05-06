const functionButtons = document.querySelectorAll('.navbar-item');
const fileSelector = document.getElementById('file-selector');
const saveBtn = document.querySelector('.save-JSON');
const loadBtn = document.querySelector('#btnLoad')
const loadConfirm = document.querySelector('.load-confirm');
const cancelBtn = document.querySelector('.cancel-btn')
let textArea = document.querySelector('.text');
const warningModal = document.querySelector('.confirmation-modal')

let input = document.getElementById('file-selector')
let file = input.files[0];


// resize for mobile address bar
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

// editing commands
functionButtons.forEach(button => {
    button.addEventListener('click', () => {

        let command = button.dataset['element'];

        document.execCommand(command, false, null)
    })
})

//save a JSON file

function download() {
    const sampleJSON = {
        fileContent: textArea.innerHTML
    }

    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(sampleJSON, null, 2)], {
        type: "application/json"
    }));
    a.setAttribute("download", "textEditor.JSON");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

saveBtn.addEventListener('click', download);


// load a JSON file

//check for loaded file

function checkLoaded() {
    if (!input.files[0]) {
        alert("Please select a file before clicking 'Load'");
        return false;
    } else {
        return true;
    }
}

function setLoadedFile() {
    input = document.getElementById('file-selector')
    file = input.files[0];
}

function loadJSON() {
    let fr;

    if (typeof window.FileReader !== 'function') {
        alert("The file API isn't supported on this browser.");
        return;
    }

    if (checkLoaded()) {
        
        setLoadedFile();
        
        if (!input.files) {
            alert("This browser doesn't seem to support the `files` property of file inputs.");
        }

        fr = new FileReader();
        fr.onload = receivedText;
        fr.readAsText(file);

        function receivedText(e) {
            let lines = e.target.result;
            var newArr = JSON.parse(lines);
            textArea.innerHTML = Object.values(newArr);
        }
        closeModal();
    }
}

loadBtn.addEventListener('click', openModal);

// modal handler
function openModal() {
    warningModal.classList.add('modal-in');
}

function closeModal() {
    warningModal.classList.remove('modal-in');
}

loadConfirm.addEventListener('click', loadJSON);
cancelBtn.addEventListener('click', closeModal);