
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
        document.getElementById('suggestions_options').checked ? sessionStorage.setItem('suggestions_checked', true) : sessionStorage.setItem('suggestions_checked', false);
        sessionStorage.setItem('img_count', image_slider.value); 
        sessionStorage.setItem('options', options_arr);
        window.location.replace('game');
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
const image_count = document.getElementById('image_count');
const image_slider = document.getElementById('image_slider');
const image_count_field = document.getElementById('image_count_field');
let total = 0;

//Changes the total image counter
const change_total = (id, num) => {
    id.checked ? total += num : total -= num;
    change_slider(total);
}

//Updates the placeholder for user input based on slider value
const update_image_count_field = () => {
    image_count_field.value = '';
    return image_count_field.placeholder = image_slider.value;
}

//Updates image count displayed to user
const update_image_count = (num) => {
    return image_count.innerText = `Number of Images: ${num}`;
}

//Controlling user's image count input and updating slider to it's value
image_count_field.addEventListener('keydown', (event) => {
    let boxes = document.querySelectorAll('input[type="checkbox"]:not(#suggestions_options)');
    let boxes_checked = 0;
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].checked) boxes_checked += 1; 
    }
    if (boxes_checked !== 0) {
        if (event.key === 'Backspace') {
            image_count_field.addEventListener('keyup', () => {
            if (image_count_field.value === '') {
                image_count_field.placeholder = 1;
                image_slider.value = 1;
                update_image_count(image_slider.value);
            } else {
                image_slider.value = image_count_field.value;
                update_image_count(image_slider.value);
            }
        });
        } else if (event.key === 0 && image_count_field.value === '') {
            event.preventDefault();
        } else {
            const good_chars = /[0-9]/g;
            let input = event.key.match(good_chars); 
            if (input !== null) {
                let total_input = image_count_field.value + input;
                total_input = parseInt(total_input);
                let max_value = parseInt(image_slider.max);
                if (total_input <= max_value) {
                    image_slider.value = image_count_field.value + input;
                    update_image_count(image_slider.value);
                } else {
                    event.preventDefault();
                    image_count_field.value = total_input = max_value;
                    image_slider.value = max_value;
                    update_image_count(image_slider.value);
                }
            } else {
                event.preventDefault();
            }
        }
    } else {
        event.preventDefault();
    }
});

//Sets the min, max, step, and value attributes of slider. Also, sets the initial Image Count
const change_slider = (num) => {
    let max = num;
    let min = 1;
    image_slider.setAttribute('min', min);
    image_slider.setAttribute('max', max);
    image_slider.setAttribute('value', max);
    image_slider.value = max;
    update_image_count_field();
    //Resets input field to nothing and updates placeholder to 0 when no boxes are checked
    if (num === 0) {
        document.getElementById('image_count_field').value = '';
        document.getElementById('image_count_field').setAttribute('placeholder', 0);

    }
    update_image_count(num);
}

//Gets value of thumb on range slider
const slide = (value) => {
    update_image_count(value);
    update_image_count_field();
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
        change_slider(total);
    } else if (!all.checked) {
        main_characters.disabled = false;
        change_slider(total);
    }
});

// 2040 files, 2014 without main characters
