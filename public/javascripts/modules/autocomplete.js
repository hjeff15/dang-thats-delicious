function autocomplete(input, latInput, lngInput) {
    // console.log(input, latInput, lngInput);
    if(!input) return; // skipt fn from running if there is no input on the page
    const dropdown = new google.maps.places.Autocomplete(input);

    dropdown.addListener('place_changed', () => {
        const place = dropdown.getPlace();
        latInput.value = place.geometry.location.lat();
        lngInput.value = place.geometry.location.lng();
        console.log(place);
    });
    // if someone hits enter on the addres field, don't submit the form
    input.on('keydown', (e) => {
        if(e.keyCode === 13) e.preventDefault();
    });
}

export default autocomplete;