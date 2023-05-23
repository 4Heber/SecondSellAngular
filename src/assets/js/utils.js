
// TOGGLE HEADER SEARCHBAR VISIBILITY FUNCTION
function toggleSearchbarContent(){
    // console.log('--exe-01--')
    var dropdownContent = document.getElementById('dropdown-content');
    var searchbar = document.getElementById('searchbar');
    
    dropdownContent.style.display = "flex";
    searchbar.addEventListener('blur', ()=>{
        setTimeout(()=>{
            dropdownContent.style.display = "none";
        },200)
    })
}

// HEADER SEARCHBAR FILTER FUNCTION
function filterFunction(){
    console.log('searching...')
}