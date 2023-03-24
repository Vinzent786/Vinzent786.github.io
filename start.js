console.log('test);

///Sets game options in browser's session storage then loads the game
function LoadGame() {
    let options = document.querySelectorAll('input[type="checkbox"');
    let options_arr = [];
    for (let i = 0; i < options.length - 1; i++) {
        if (options[i].checked === true) options_arr.push(options[i].id);
    }
    for (let i = 0; i < options_arr.length; i++) {
        if (options_arr[i] === 'all_characters') {
            for (let n = 0; n < options_arr.length; n++) {
                if (options_arr[n] === 'main_characters')
                options_arr.splice(n, 1);
            }
        }
    }
    if (options_arr.length === 0) {
        const options_error = document.getElementById("options_error");
        options_error.style.display = 'inline';
        setTimeout(() => {
            options_error.style.display = 'none'
        }, 3000);
    } else if (options_arr.length > 0) {
        document.getElementById('suggestions_options').checked ?sessionStorage.setItem('suggestions_checked', true) : sessionStorage.setItem('suggestions_checked', false);
        sessionStorage.setItem('options', options_arr);
        window.location.replace('game.html');
    }
}

//Checks all check boxes
function SelectAll(source) {
    let boxes = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < boxes.length - 1; i++) {
        boxes[i].checked = source.checked;
    }
}

const main_characters = document.getElementById('main_characters');
const all_characters = document.getElementById('all_characters');
const bows = document.getElementById('bows');
const creatures = document.getElementById('creatures');
const drip = document.getElementById('drip');
const shrines = document.getElementById('shrines');
const enemies  = document.getElementById('enemies');
const food = document.getElementById('food');
const locations = document.getElementById('locations');
const materials = document.getElementById('materials');
const miscellaneous = document.getElementById('miscellaneous');
const shields = document.getElementById('shields');
const weapons = document.getElementById('weapons');
const all = document.getElementById('all');
//This is for the total image counter on screen
const image_count = document.getElementById('image_count');
let total = 0;

//Changes the total image counter
const change_total = (id, num) => {
    id.checked ? total += num : total -= num;
    return image_count.innerText = `Total Images: ${total}`;
}

main_characters.addEventListener('click', () => {
    change_total(main_characters, 26)
});

//Since All charcaters includes main characters, main characters has to be deleted from options_arr, 
//along with being subtracted from the image counter if all_characters is checked
all_characters.addEventListener('click', () => {
    if (all_characters.checked) {
        if(main_characters.checked) {
            change_total(all_characters, 427 - 26);
        } else if (!main_characters.checked) {
            change_total(all_characters, 427);
        }
    } else if (!all_characters.checked) {
        if (main_characters.checked) {
            change_total(all_characters, 427 - 26);
        } else if (!main_characters.checked) {
            change_total(all_characters, 427);
        }
    }
    if (all_characters.checked) {
        main_characters.checked = false;
        main_characters.disabled = true;
    } else if (!all_characters.checked) {
        main_characters.disabled = false;
    }
});

bows.addEventListener('click', () => {
    change_total(bows, 31);
});

creatures.addEventListener('click', () => {
    change_total(creatures, 86);
});

drip.addEventListener('click', () => {
    change_total(drip, 120);
});

shrines.addEventListener('click', () => {
    change_total(shrines, 136);
});

enemies.addEventListener('click', () => {
    change_total(enemies, 84);
});

food.addEventListener('click', () => {
    change_total(food, 190);
});

locations.addEventListener('click', () => {
    change_total(locations, 646);
});

materials.addEventListener('click', () => {
    change_total(materials, 112);
});

miscellaneous.addEventListener('click', () => {
    change_total(miscellaneous, 28);
});

shields.addEventListener('click', () => {
    change_total(shields, 32);
});

weapons.addEventListener('click', () => {
    change_total(weapons, 122);
});

//Checking all should also uncheck main characters, as main characters are included in all characters
all.addEventListener('click', () => {
    total = 0;
    if (all.checked) {
        main_characters.checked = false;
        main_characters.disabled = true;
        total += 2014;
        image_count.innerText = `Total Images: ${total}`;
    } else if (!all.checked) {
        main_characters.disabled = false;
        image_count.innerText = `Total Images: ${total}`;
    }
});

// 2040 files, 2014 without main characters
